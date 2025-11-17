import type { Request, Response } from "express";
import e from "express";
import { FIRESTORE } from "./firestoreSetup.ts";
import { prompts } from "./prompts.ts";
import { Timestamp } from "firebase-admin/firestore";
import 'dotenv/config'
import cors from "cors"
import { onSnapshot, doc, query } from "firebase/firestore";

const port = 5000

// initialize the express app to accept cross-origin requests and read the body of incoming requests as json
const app = e()
app.use(cors())
app.use(e.json())

const timeouts: Record<string, NodeJS.Timeout> = {}
const deletionQueue: Record<string, NodeJS.Timeout> = {}

// lists all rooms. no purpose other than to test that the service account is authenticated correction
app.get("/", (req: Request, res: Response) => {
    FIRESTORE.collection("rooms").listDocuments()
        .then((data) => {
            res.send(data)
        })
})

// creates a room with only the data necessary for browsing rooms. data relating to the game state is added later
app.post('/create-room', async (req: Request, res: Response) => {
    if (isValidCreateRoomRequest(req)) {
        console.log(req.body)
        
        FIRESTORE.collection("rooms").add({
            description: req.body.description,
            isActive: false,
            isVisible: true,
            maxSize: req.body.maxSize,
            name: req.body.name,
            participants: [],
            rounds: req.body.rounds, 
            timeLimit: req.body.timeLimit,
            url: req.body.url
        }).then((docRef) => {
            res.json("valid")
        })
    }
    else {
        res.json("invalid")
    }
})

// starts the game
app.post('/start-game', async (req: Request, res: Response) => {
    // const authToken = getRequestAuthToken(req)
    const roomId = req.body.roomId
    if (roomId) {
        const snapshot = await FIRESTORE.doc(`rooms/${roomId}`).get()
        // if the round is already going, there's no need to do anything
        if (snapshot.data()?.isActive) {
            return
        }
        // select the first prompt and speaker
        const randomIndex = Math.floor(Math.random() * prompts.length)
        await FIRESTORE.doc(`rooms/${roomId}`).update({
            isActive: true,
            previousPrompts: [randomIndex],
            prompt: prompts[randomIndex],
            roundsLeft: snapshot.data()?.rounds,
            speakerIndex: 0,
            speakerStart: Timestamp.now()
        })

        // recursively play turns until the game is finished
        timeouts[roomId] = setTimeout(() => {
            playTurn(roomId)
        }, snapshot.data()?.timeLimit * 1000)
    }
    else {
        res.json(`${roomId} is an invalid room id`)
    }
})

app.post('/skip-turn', (req: Request, res: Response) => {
    const roomId = req.body.roomId
    if (roomId) {
        // clear the room's current timeout, then play the next turn
        clearTimeout(timeouts[roomId])
        playTurn(roomId)
    }
    else {
        res.json(`failed to skip turn`)
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
        && "url" in body && typeof(body.url) === "string"
    )
}

/**
 * Plays a turn of the game. After the turn ends, this function recursively calls itself 
 * until the room's roundsLeft field becomes 0
 * @param {string} roomId - the document id of the room document to play a turn in
 */
async function playTurn(roomId: string) {
    // get the data from the room
    const snapshot = await FIRESTORE.doc(`rooms/${roomId}`).get()
    if (!snapshot) {
        return
    }

    // get the next speaker index
    const participants = snapshot.data()?.participants
    const speakerIndex = snapshot.data()?.speakerIndex
    const nextSpeakerIndex = (speakerIndex + 1) % participants.length

    // if the next speaker index is 0, we've cycled through all participants and should choose a new prompt and update the number of rounds
    const cycleComplete = (nextSpeakerIndex === 0)
    const roundsLeft = cycleComplete ? snapshot.data()?.roundsLeft - 1 : snapshot.data()?.roundsLeft

    // if we've done all the rounds, end the game
    if (roundsLeft <= 0) {
        endGame(roomId)
    }

    // otherwise update the variables needed to play another turn
    const timeLimit = snapshot.data()?.timeLimit
    const previousPrompts: Array<number> = snapshot.data()?.previousPrompts
    let prompt = snapshot.data()?.prompt

    // if a cycle was just completed, pick a new prompt
    if (cycleComplete) {
        let randomIndex = Math.floor(Math.random() * prompts.length)
        while (previousPrompts.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * prompts.length)
        }
        prompt = prompts[randomIndex]
        previousPrompts.push(randomIndex)
    }

    // update firestore
    await FIRESTORE.doc(`rooms/${roomId}`).update({
        speakerIndex: (speakerIndex + 1) % participants.length,
        speakerStart: Timestamp.now(),
        previousPrompts: previousPrompts,
        prompt: prompt,
        roundsLeft: roundsLeft
    })

    // make a timeout to play the next turn after the timeLimit runs out
    timeouts[roomId] = setTimeout(() => {
        playTurn(roomId)
    }, timeLimit * 1000)
}

async function endGame(roomId: string) {
    // if the room has been queued for deletion, return
    if (deletionQueue[roomId]) {
        return
    }
    // set roundsLeft equal to 0
    await FIRESTORE.doc(`rooms/${roomId}`).update({
        roundsLeft: 0,
        expiresAt: Timestamp.fromMillis((Timestamp.now().toMillis() + 30 * 1000))
    })
    // queue this room for deletion in 30 seconds
    deletionQueue[roomId] = setTimeout(() => {
        FIRESTORE.doc(`rooms/${roomId}`).delete()
    }, 30 * 1000)
    return
}