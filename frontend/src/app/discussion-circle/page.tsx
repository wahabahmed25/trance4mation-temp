'use client'
import { useEffect, useState } from "react"
import { UserData } from "@/features/discussion-circle/types/UserData"
import { defaultRooms, defaultPeople, BLUE, TEAL} from './defaults'
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"
import Room from "@/features/discussion-circle/components/Room"
import { RoomData } from "@/features/discussion-circle/types/RoomData"
import { initializeApp } from "firebase/app"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore"
import { onAuthStateChanged, User } from "firebase/auth"
import { getAuth, signInAnonymously } from "firebase/auth";
import RoomListing from "@/features/discussion-circle/components/RoomListing"
import { MessageData } from "@/features/discussion-circle/types/MessageData"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState<RoomData[]>([])
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>(undefined)
    const [user, setUser] = useState<User | undefined>(undefined)
    const [participantId, setParticipantId] = useState<string | undefined>(undefined)
    const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false)

    function fetchData() {
        getRooms()
        .then((rooms) => {
            setRoomListings(rooms)
        })
    }

    async function joinRoom(roomData: RoomData) {
        // TODO: set security rules to 
        // - prevent joining if the room is full. 
        // - only allow updating the size if the user is in the room.
        await Promise.all([
            // add a new participant
            // TODO: set security rules to
            // - (DONE) prevent reads if the room is anonymous
            addDoc(collection(firestore, "rooms", roomData.id, "participants"), {
                name: user?.isAnonymous ? "Anonymous" : "jerry",
                uid: user?.uid
            }),
            // update room size
            updateDoc(doc(collection(firestore, "rooms"), roomData.id), {
                size: increment(1)
            })
        ])
        .then(([participantRef, roomRef]) => {
            // get the id of the newly created doc. use this id for validation since it's not tied to any user data
            // TODO: modify the participants subcollection to
            // - (DONE) track which participantId belongs to each uid 
            // Also, set security rules to:
            // - allow writes to the messages subcollection only if this participantId and uid match the ones in the participants subcollection
            setParticipantId(participantRef.id)
            console.log(participantRef.id)
        })
    }

    async function leaveRoom() {
        if (!currentRoom) {
            return
        }

        // TODO: set security rules to check 
        // - if the uid of the user that's leaving matches the uid of the authenticated user. 
        // - if the room size increment is coming from a user in the room
        await Promise.all([
            // remove from participants
            // TODO: set security rules to
            // - allow writes to the participants subcollection only if this participantId and uid match the ones in the participants subcollection
            deleteDoc(doc(collection(firestore, "rooms", currentRoom.id, "participants"), participantId)),
            // update room size
            updateDoc(doc(collection(firestore, "rooms"), currentRoom.id), {
                size: increment(-1)
            })
        ])
        .then(() => {
            setCurrentRoom(undefined)
            setParticipantId(undefined)
        })
    }

    async function sendMessage(message: string) {
        if (!currentRoom) {
            return
        }

        await addDoc(collection(firestore, "rooms", currentRoom.id, "messages"), {
            text: message,
            sender: participantId
        })
    }

    useEffect(() => {
        const auth = getAuth();
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
                console.log("signed in as ", auth)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(user)
                setUser(user)
                fetchData()
            } else {
                // User is signed out
                setUser(undefined)
            }
        });
    }, [])

    if (isCreationMenuOpen) {
        return (
            <RoomCreationMenu
            onCloseButtonClick={() => setCreationMenuOpen(false)}
            onConfirmButtonClick={async (roomData: Omit<RoomData, "id">) => {
                await createRoom(roomData)
                if (isCreationMenuOpen) {
                    setCreationMenuOpen(false)
                }
                fetchData()
            }}
            />
        )
    }

    if (currentRoom === undefined) {
        return (
            <div className={"w-screen h-screen bg-[#006D77] p-8"}>
                <h1 className="font-bold text-3xl">Discussion Circle</h1>
                <button onClick={async () => {
                    setCreationMenuOpen(true)
                    // await createRoom(placeholder)
                    // fetchData()
                }}>
                    Create
                </button>
                <button onClick={fetchData}>
                    Reload
                </button>
                {roomListings.map((roomData) => 
                    <RoomListing 
                    key={roomData.id} 
                    roomData={roomData} 
                    onClick={(roomData) => {
                        // console.log(roomData)
                        joinRoom(roomData)
                        setCurrentRoom(roomData)
                    }}
                    />
                )}
            </div>
        )
    }

    else {
        return (
            <Room 
            roomData={currentRoom}
            onExitButtonClick={leaveRoom}
            onSendMessageButtonClick={sendMessage}
            />
        )
    }

}

async function getRooms() {
    const querySnapshot = await getDocs(collection(firestore, "rooms"));
    const rooms = querySnapshot.docs.map((document) => {
        const data = document.data()
        return {
            id: document.id,
            description: data.description,
            isAnonymous: data.isAnonymous,
            maxSize: data.maxSize,
            name: data.name,
            palette: data.palette,
            rounds: data.rounds,
            size: data.size,
            timeLimit: data.timeLimit,
        }
    })
    return rooms
}

async function createRoom(settings: Omit<RoomData, "id">) {
    await addDoc(collection(firestore, "rooms"), settings)
}
