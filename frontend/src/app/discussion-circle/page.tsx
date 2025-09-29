'use client'
import { useEffect, useState } from "react"
import { UserData } from "@/features/discussion-circle/types/UserData"
import { defaultRooms, defaultPeople} from './defaults'
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"
import Room from "@/features/discussion-circle/components/Room"
import { RoomData } from "@/features/discussion-circle/types/RoomData"

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState(defaultRooms)
    const [roomCode, setRoomCode] = useState<string | null>(null)
    const [people, setPeople] = useState<UserData[]>(defaultPeople)
    const [collapsed, setCollapsed] = useState(false)
    const [isCreationMenuOpen, setIsCreationMenuOpen] = useState(false)

    useEffect(() => {
        function onResize() {
            if (window.innerWidth < 600) {
                setCollapsed(true)
            }
            else {
                setCollapsed(false)
            }
        }

        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    function openRoomCreationMenu() {
        setIsCreationMenuOpen(true)
    }

    function closeRoomCreationMenu() {
        setIsCreationMenuOpen(false)
    }

    function joinRoom(roomData: RoomData) {
        if (!roomData.code) {
            return
        }
        setRoomCode(roomData.code)
        // fetch data
    }

    function createRoom(roomData: RoomData) {
        console.log(roomData)
    }

    return (
        <div className="flex flex-row h-screen">
            {(!collapsed) ? <RoomBrowser rooms={roomListings} onCreateButtonClick={openRoomCreationMenu} onRoomClick={joinRoom}/> : <></>}
            
            {
            isCreationMenuOpen  ? <RoomCreationMenu onCloseButtonClick={closeRoomCreationMenu} onConfirmButtonClick={createRoom}/> : 
            (roomCode != null)  ? <Room roomCode={roomCode}/> : <></>
            }
            {/* <Room/> */}
        </div>
    )
}



