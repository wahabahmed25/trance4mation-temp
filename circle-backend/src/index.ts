import type { Request, Response } from "express";
import e from "express";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app"
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import 'dotenv/config'
import cors from "cors"

const port = 5000

// initialize the express app to accept cross-origin requests and read the body of incoming requests as json
const app = e()
app.use(cors())
app.use(e.json())

// initialize the service account. Changes made through these firebase / firestore instances ignore security rules
const firebase = initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
    }),
});
const firestore = getFirestore(firebase)

// list of prompts to choose from. feel free to move this to a different file to declutter this file
const prompts = [
    "How do you feel about your commute to school?",
    "What was the worst schedule you’ve ever had?",
    "What was the best schedule you’ve ever had?",
    "What are your favorite food spots around campus?",
    "Do you feel confident in finding a job related to your major?",
    "What do you think about CUNY’s commuter culture? Would you prefer to attend a school with more students living on-campus?",
    "Do you think it’s hard to make friends at CUNY compared to at other schools? Have you made any friends at CUNY?",
    "What was your first choice when applying to college? How do you feel about ending up at CUNY?",
    "Do you feel that your classes have been transformative? Have they changed the way you view the world?",
    "What are your opinions on the use of AI in school? Have you used AI to help with your coursework?" ,
    "Do you think your school provides enough academic and career services for you to succeed? What services have you used?",
    "What class do you retain the most information from? Share something interesting you learned from that class.",
    "What class do you retain the least information from? Share something from that class that you should know, but don’t.",
    "What’s a common stereotype of your major? Is it accurate? Does it apply to you?",
    "If you had unlimited time and money to study, what major would you choose, and which classes would you take?",
    "What’s the best class you’ve taken so far?",
    "What’s the worst class you’ve taken so far?"
]

// lists all rooms. no purpose other than to test that the service account is authenticated correction
app.get("/", (req: Request, res: Response) => {
    firestore.collection("rooms").listDocuments()
        .then((data) => {
            res.send(data)
        })
})

// creates a room with only the data necessary for browsing rooms. data relating to the game state is added later
app.post('/create-room', (req: Request, res: Response) => {
    if (isValidCreateRoomRequest(req)) {
        console.log(req.body)
        firestore.collection("rooms").add({
            description: req.body.description,
            isActive: false,
            maxSize: req.body.maxSize,
            name: req.body.name,
            participants: [],
            rounds: req.body.rounds, 
            timeLimit: req.body.timeLimit,
        }).then((docRef) => {
            res.json("valid")
        })
    }
    else {
        res.json("invalid")
    }
})

// starts the game
app.post('/start-round', (req: Request, res: Response) => {
    // const authToken = getRequestAuthToken(req)
    const roomId = req.body.roomId
    if (roomId) {
        firestore.doc(`rooms/${roomId}`).get()
        .then((snapshot) => {
            // if the round is already going, there's no need to do anything
            if (snapshot.data()?.isActive) {
                return
            }
            const randomIndex = Math.floor(Math.random() * prompts.length)
            console.log(randomIndex);
            // select the first prompt and speaker
            firestore.doc(`rooms/${roomId}`).update({
                isActive: true,
                prompt: prompts[randomIndex],
                roundsLeft: snapshot.data()?.rounds,
                speakerIndex: 0,
                speakerStart: Timestamp.now()
            })
            // recursively play turns until the game is finished
            playTurn(roomId)
        })
    }
    else {
        res.json(`${roomId} is an invalid room id`)
    }
})

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})

// validate incoming request body to make sure we don't write bad data to the firestore
function isValidCreateRoomRequest(req: Request) {
    const body = req.body
    return (
        "description" in body && typeof(body.description) === "string"
        && "maxSize" in body && typeof(body.maxSize) === "number"
        && body.maxSize > 0 
        && "name" in body && typeof(body.name) === "string"
        && "timeLimit" in body && typeof(body.timeLimit) === "number"
        && body.timeLimit  > 0
        && "rounds" in body && typeof(body.rounds) === "number"
    )
}

/**
 * Plays a turn of the game. After the turn ends, this function recursively calls itself 
 * until the room's roundsLeft field becomes 0
 * @param {string} roomId - the document id of the room document to play a turn in
 */
function playTurn(roomId: string) {
    // get the data from the room
    firestore.doc(`rooms/${roomId}`).get()
    .then((snapshot) => {
        // get the next speaker index
        const participants = snapshot.data()?.participants
        const speakerIndex = snapshot.data()?.speakerIndex
        const nextSpeakerIndex = (speakerIndex + 1) % participants.length

        // if the next speaker index is 0, we've cycled through all participants and should choose a new prompt and update the number of rounds
        const cycleComplete = (nextSpeakerIndex === 0)
        const prompt = cycleComplete ? prompts[Math.floor(Math.random() * prompts.length)] : snapshot.data()?.prompt
        const roundsLeft = cycleComplete ? snapshot.data()?.roundsLeft - 1 : snapshot.data()?.roundsLeft
        const timeLimit = snapshot.data()?.timeLimit

        // update firestore
        firestore.doc(`rooms/${roomId}`).update({
            speakerIndex: (speakerIndex + 1) % participants.length,
            speakerStart: Timestamp.now(),
            prompt: prompt,
            roundsLeft: roundsLeft
        })

        // if roundsLeft is not 0, set a timeout for the next update
        if (roundsLeft > 0) {
            // set a timeout for the next update
            setTimeout(() => {
                playTurn(roomId)
            }, timeLimit * 1000)
        }
    })
}