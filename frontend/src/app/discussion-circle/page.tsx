'use client'
import { useEffect, useRef, useState } from "react"
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"
import Room from "@/features/discussion-circle/components/Room"
import { RoomData } from "@/features/discussion-circle/types/RoomData"
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore"
import Welcome from "@/features/discussion-circle/components/Welcome"
import { useAuth } from "@/context/AuthContext"
import { ClientRoomData } from "@/features/discussion-circle/types/ClientRoomData"
import { FIREBASE_APP, FIRESTORE } from "./defaults"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"

const backendUrl = "http://localhost:5000"

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState<RoomData[]>([])
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>()
    const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false)
    const [isRoomBrowserOpen, setRoomBrowserOpen] = useState<boolean>(true);
    const [isSmallScreen, setSmallScreen] = useState<boolean>(false)
    const [auth, setAuth] = useState<User | undefined>(undefined)
    const user = useAuth()
    const unsubscribe = useRef<() => void>(undefined)

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
        unsubscribe.current = onSnapshot(doc(FIRESTORE, "rooms", roomData.id), (snap) => {
            const newRoomData = {
                ...snap.data(),
                "id": roomData.id
            } as RoomData
            setCurrentRoom(newRoomData)
            console.log(newRoomData)
        })
        await updateDoc(doc(collection(FIRESTORE, "rooms"), roomData.id), {
            participants: arrayUnion({
                name: user.user?.name,
                uid: user.user?.uid
            })
        })
    }

    async function leaveCurrentRoom() {
        if (unsubscribe.current != undefined) {
            unsubscribe.current()
            unsubscribe.current = undefined
        }
        if (!currentRoom?.id) {
            return
        }
        setCurrentRoom(undefined)
        await updateDoc(doc(collection(FIRESTORE, "rooms"), currentRoom?.id), {
            participants: arrayRemove({
                name: user.user?.name,
                uid: user.user?.uid
            })
        })
    }

    async function startRound() {
        if (!auth || !currentRoom) {
            return
        }
        auth.getIdToken(true)
        .then((token) => {
            fetch(`${backendUrl}/start-round`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId: currentRoom.id
                })
            })
            .then((response) => {
                response.json()
                .then((data) => console.log(data))
                .catch((error) => console.log(error))
            })
        })
    }

    useEffect(() => {
        fetchData()

        const auth = getAuth(FIREBASE_APP)
        onAuthStateChanged(auth, (authData) => {
            if (authData) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setAuth(authData);
                // ...
            } else {
                // User is signed out
                // ...
                setAuth(undefined)
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
            <RoomCreationMenu
            onCloseButtonClick={() => {
                setCreationMenuOpen(false)
            }}
            onConfirmButtonClick={createRoom}
            onRoomCreated={fetchData}
            />
         : null}
        <div 
        className="w-screen h-screen flex relative"
        style={{background: "linear-gradient(180deg, #7EC8E3 0%, #E9F8FF 10%, #FDE7D8 15%, #FFF7E8 55%, #FFF7D8 100%)"}}
        >
            <div 
            className="h-full flex w-full md:w-1/4 absolute md:relative p-8"
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
                onReloadButtonClick={() => {
                    setRoomListings([]) 
                    fetchData()
                }}
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
                    onStartButtonClick={startRound}
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
    const q = query(collection(FIRESTORE, "rooms"))
    const querySnapshot = await getDocs(q);
    const rooms = querySnapshot.docs.map((document) => {
        return {
            ...document.data(),
            "id": document.id
        } as RoomData
    })
    return rooms
}

// async function createRoom(settings: ClientRoomData) {
//     await addDoc(collection(FIRESTORE, "rooms"), settings)
// }

async function createRoom(settings: ClientRoomData) {
    fetch(`${backendUrl}/create-room`, {
        method: "POST",
        body: JSON.stringify(settings),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        response.json()
        .then((data) => {
            console.log(data)
            return true
        })
    })
    .catch((error) => {
        console.log("create room failed")
        return false
    })
    return false
}