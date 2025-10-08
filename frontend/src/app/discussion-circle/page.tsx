'use client'
import { useEffect, useState } from "react"
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"
import Room from "@/features/discussion-circle/components/Room"
import { RoomData } from "@/features/discussion-circle/types/RoomData"
import { initializeApp } from "firebase/app"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc } from "firebase/firestore"
import { onAuthStateChanged, User } from "firebase/auth"
import { getAuth, signInAnonymously } from "firebase/auth";
import Welcome from "@/features/discussion-circle/components/Welcome"
import { useAuth } from "@/context/AuthContext";

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
const auth = getAuth()

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState<RoomData[]>([])
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>(undefined)
    // const [user, setUser] = useState<User | undefined>(undefined)
    const [participantId, setParticipantId] = useState<string | undefined>(undefined)
    const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false)
    const [isRoomBrowserOpen, setRoomBrowserOpen] = useState<boolean>(true);
    const [isSmallScreen, setSmallScreen] = useState<boolean>(false)
    const [user, setUser] = useState<User | undefined>(undefined)
    // const user = useAuth()

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

    async function leaveCurrentRoom() {
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                console.log(user)
                setUser(user)
                fetchData()
            } else {
                // User is signed out
                setUser(undefined)
            }
        });

        function onResize() {
            if (window.innerWidth < 768) {
                setSmallScreen(true)
            }
            else {
                setSmallScreen(false)
            }
        }

        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }

    }, [])

    return (
        <div className="w-screen h-screen bg-black flex relative">
            <div className="h-full flex border-r-4 border-slate-900"
            style={{
                width: `${isSmallScreen ? "100%" : "25%"}`,
                position: `${isSmallScreen ? "absolute" : "relative"}`,
                padding: `${.25 * 8}rem`,
                visibility: `${
                    isRoomBrowserOpen ? 
                        isSmallScreen ?
                            !(isCreationMenuOpen || currentRoom) ?
                                "visible"
                            : "hidden"
                    :"visible" 
                    : "hidden"
                }`
            }}
            >
                <RoomBrowser
                rooms={roomListings}
                onCreateButtonClick={() => setCreationMenuOpen(true)}
                onReloadButtonClick={() => fetchData()}
                onRoomClick={(roomData: RoomData) => {
                    leaveCurrentRoom()
                    joinRoom(roomData)
                    setCurrentRoom(roomData)
                }}
                />
            </div>

            <div className="grow h-full p-8">
                {isCreationMenuOpen ? 
                    <RoomCreationMenu
                    onCloseButtonClick={() => {
                        setCreationMenuOpen(false)
                    }}
                    onConfirmButtonClick={(roomData) => {
                        createRoom(roomData)
                        fetchData()
                    }}
                    />
                : currentRoom ? 
                    <Room 
                    roomData={currentRoom}
                    onExitButtonClick={leaveCurrentRoom}
                    onSendMessageButtonClick={sendMessage}
                    />
                : isSmallScreen ?
                    <></>
                : <Welcome/>
                }
            </div>
        
        </div>
    )

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
