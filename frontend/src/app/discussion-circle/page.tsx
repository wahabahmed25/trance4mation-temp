'use client'
import { useEffect, useState } from "react"
import { User } from "@/features/discussion-circle/types/User"
import Carousel from '@/features/discussion-circle/components/Carousel'
import ChatLog from '@/features/discussion-circle/components/ChatLog'
import Navbar from '@/features/discussion-circle/components/Navbar'
import { defaultRooms, defaultMessages, defaultPeople, YELLOW, PURPLE, TEAL, BLUE, RED } from './defaults'
import TextInput from "@/features/discussion-circle/components/TextInput"
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser"

export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState(defaultRooms)
    const [room, setRoom] = useState<string | null>(null)
    const [people, setPeople] = useState<User[]>(defaultPeople)
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
            
            <div className="flex flex-col w-3/4 grow" style={{backgroundColor: YELLOW}}>
                <Navbar/>
                <div className="flex flex-col p-2 grow justify-end gap-2">
                    <ChatLog messages={defaultMessages}/>
                    <TextInput placeholder="Message"/>
                    <div style={{
                        height: "80px",
                        marginTop: "50px"
                    }}>
                        <Carousel users={people}/>
                    </div>
                </div>
            </div>
        </div>
    )
}



