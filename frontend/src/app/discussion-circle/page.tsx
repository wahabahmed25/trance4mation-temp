'use client'
import { useEffect, useState } from "react"
import { UserData } from "@/features/discussion-circle/types/UserData"
import { defaultRooms, defaultPeople} from './defaults'
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"
import Room from "@/features/discussion-circle/components/Room"
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu"

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState(defaultRooms)
    const [room, setRoom] = useState<string | null>(null)
    const [people, setPeople] = useState<UserData[]>(defaultPeople)
    const [collapsed, setCollapsed] = useState(false)

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

    return (
        <div className="flex flex-row h-screen">
            {(!collapsed) ? <RoomBrowser rooms={roomListings}/> : <></>}
            
            <Room/>
            {/* <RoomCreationMenu/> */}
        </div>
    )
}



