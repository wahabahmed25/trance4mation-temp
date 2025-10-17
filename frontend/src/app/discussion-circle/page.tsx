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
import { FIRESTORE } from "./defaults"

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState<RoomData[]>([])
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>()
    const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false)
    const [isRoomBrowserOpen, setRoomBrowserOpen] = useState<boolean>(true);
    const [isSmallScreen, setSmallScreen] = useState<boolean>(false)
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
        await updateDoc(doc(collection(FIRESTORE, "rooms"), currentRoom?.id), {
            participants: arrayRemove({
                name: user.user?.name,
                uid: user.user?.uid
            })
        })
        setCurrentRoom(undefined)
    }

    useEffect(() => {
        fetchData()

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
            <div className="py-40 px-8 absolute z-2 w-screen h-screen flex items-center justify-center bg-slate-900/75">
                <div className="flex border border-white/10 bg-[#0C1723]/80 bg-black rounded-xl p-8 grow max-w-120">
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

async function createRoom(settings: ClientRoomData) {
    await addDoc(collection(FIRESTORE, "rooms"), settings)
}