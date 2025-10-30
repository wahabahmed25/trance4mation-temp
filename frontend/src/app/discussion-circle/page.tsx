'use client'
import { useEffect, useRef, useState } from "react"
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"
import Room from "@/features/discussion-circle/components/Room"
import { RoomData } from "@/features/discussion-circle/types/RoomData"
import Welcome from "@/features/discussion-circle/components/Welcome"
import { useAuth } from "@/context/AuthContext"
import { FIREBASE_APP, FIRESTORE } from "./defaults"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { createRoom, getRooms, joinRoom, leaveRoom, subscribeToRoom } from "./api"
import { redirect } from "next/navigation"

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState<RoomData[]>([])
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>()
    const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false)
    const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false)
    const [auth, setAuth] = useState<User | undefined>(undefined)
    const user = useAuth().user
    const unsubscribe = useRef<() => void>(undefined)

    if (!user) {
        redirect("/")
    }

    useEffect(() => {
        getRooms().then(setRoomListings)

        const auth = getAuth(FIREBASE_APP)
        onAuthStateChanged(auth, (authData) => {
            if (authData) {
                // User is signed in. https://firebase.google.com/docs/reference/js/firebase.User
                setAuth(authData);
            } else {
                // User is signed out
                setAuth(undefined)
            }
        });
    }, [])

    return (
        <>
        {
            isCreationMenuOpen 
                ?   <RoomCreationMenu
                    onCloseButtonClick={() => { setCreationMenuOpen(false) }}
                    onRoomCreated={() => { getRooms().then(setRoomListings) }}
                    />
                :   null
        }
        
        <div className="
            w-screen h-screen flex relative
        "
        style={{
            background: "linear-gradient(180deg, #7EC8E3 0%, #FDE7D8 20%, #FDE7D8 55%, #fff7d8ff 100%)"
        }}>
            <div className="
            h-full flex w-full md:w-1/4 p-8 
            absolute md:relative
            ">
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
                    setIsJoiningRoom(true)
                    if (currentRoom?.id) { 
                        if (unsubscribe.current) { unsubscribe.current() }
                        await leaveRoom(currentRoom.id, user?.name, user?.uid) 
                        setCurrentRoom(undefined)
                    }
                    setIsJoiningRoom(false)

                    await joinRoom(roomData.id, user?.name, user?.uid)
                    
                    if (unsubscribe.current) { unsubscribe.current() }
                    unsubscribe.current = subscribeToRoom(roomData.id, setCurrentRoom)
                }}
                />
            </div>

            <div className="
            grow h-full p-8 hidden md:block
            "
            style={{
                opacity: isJoiningRoom ? 0.7 : 1
            }}
            >
                {
                    currentRoom 
                        ?   <Room 
                            roomData={currentRoom}
                            onExitButtonClick={async () => { 
                                if (!currentRoom?.id) { return }

                                setCurrentRoom(undefined)
                                if (unsubscribe.current) { unsubscribe.current() }
                                await leaveRoom(currentRoom.id, user.name, user.uid)
                            }}
                            // onStartButtonClick={startRound}
                            />
                        :   <Welcome/>
                }
            </div>        
        </div>
        </>
    )
}
