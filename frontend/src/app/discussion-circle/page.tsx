'use client'
import { useEffect, useState } from "react"
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"
import Room from "@/features/discussion-circle/components/Room"
import { RoomData } from "@/features/discussion-circle/types/RoomData"
import { initializeApp } from "firebase/app"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, increment, query, updateDoc, where } from "firebase/firestore"
import { onAuthStateChanged, User } from "firebase/auth"
import { getAuth } from "firebase/auth";
import Welcome from "@/features/discussion-circle/components/Welcome"

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
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>()
    const [participantId, setParticipantId] = useState<string | undefined>(undefined)
    const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false)
    const [isRoomBrowserOpen, setRoomBrowserOpen] = useState<boolean>(true);
    const [isSmallScreen, setSmallScreen] = useState<boolean>(false)
    const [user, setUser] = useState<User | undefined>(undefined)
    const [mounted, setMounted] = useState(false)

    function fetchData() {
        getRooms()
        .then((rooms) => {
            setRoomListings(rooms)
        })
        .catch((error) => {
            console.log(error)
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

    async function _joinRoom(roomData: RoomData) {
        if (!user) {
            console.log("not signed in")
            return
        }

        const backendUrl =""
        auth.currentUser?.getIdToken(true).then((idToken) => {
            fetch(backendUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${idToken}`
                },
                body: roomData.id
            })
        })
    }

    useEffect(() => {
        setMounted(true)

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
        <>
        {isCreationMenuOpen ?
            <div className="py-40 absolute z-2 w-screen h-screen flex items-center justify-center bg-slate-900/75">
                <div className="flex border border-white/10 bg-[#0C1723]/80 bg-black rounded-xl p-8">
                    <RoomCreationMenu
                    onCloseButtonClick={() => {
                        setCreationMenuOpen(false)
                    }}
                    onConfirmButtonClick={(roomData) => {
                        createRoom(roomData)
                        fetchData()
                    }}
                    />
                </div>
            </div>
         : null}
        <div className="w-screen h-screen bg-gradient-to-br from-[#0F4C5C] via-[#1a1a1a] to-[#0F4C5C] flex relative">
            <div className="h-full flex w-full md:w-1/4 absolute md:relative p-8"
            style={{
                visibility: `${
                    isRoomBrowserOpen ? 
                        isSmallScreen ?
                            !(currentRoom) ?
                                "visible"
                            : "hidden"
                    : "visible" 
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
                {currentRoom ? 
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
        </>
    )

}

async function getRooms() {
    const q = query(collection(firestore, "rooms"), where("isActive", "==", false))
    const querySnapshot = await getDocs(q);
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