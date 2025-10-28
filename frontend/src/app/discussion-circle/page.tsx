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
import { createRoom, getRooms, joinRoom, leaveRoom, subscribeToRoom } from "./api"

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

    useEffect(() => {
        getRooms().then(setRoomListings)

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
            onCloseButtonClick={() => { setCreationMenuOpen(false) }}
            onRoomCreated={() => { getRooms().then(setRoomListings) }}
            />
         : null}
        <div 
        className="w-screen h-screen flex relative"
        style={{background: "linear-gradient(180deg, #7EC8E3 0%, #FDE7D8 20%, #FDE7D8 55%, #fff7d8ff 100%)"}}
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
                onCreateButtonClick={() => {
                    setCreationMenuOpen(true)
                }}
                onReloadButtonClick={() => {
                    setRoomListings([]) 
                    getRooms().then(setRoomListings)
                }}
                onRoomClick={async (roomData: RoomData) => {
                    if (currentRoom?.id) { await leaveRoom(currentRoom.id, auth) }

                    await joinRoom(roomData.id, auth)
                    
                    if (unsubscribe.current) { unsubscribe.current() }
                    unsubscribe.current = subscribeToRoom(roomData.id, setCurrentRoom)
                }}
                />
            </div>

            <div className="grow h-full p-8">
                {currentRoom ? 
                    <Room 
                    roomData={currentRoom}
                    onExitButtonClick={async () => { if(currentRoom?.id) { await leaveRoom(roomData.id, auth) }}}
                    // onStartButtonClick={startRound}
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
