'use client'
import { useEffect, useState } from "react"
import { User } from "@/features/discussion-circle/types/User"
import Carousel from '@/features/discussion-circle/components/Carousel'
import ChatLog from '@/features/discussion-circle/components/ChatLog'
import Navbar from '@/features/discussion-circle/components/Navbar'
import { defaultRooms, defaultMessages, defaultPeople } from './defaults'
import Rooms from "@/features/discussion-circle/components/Rooms"


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
            {(!collapsed) ? <Rooms rooms={defaultRooms}/> : <></>}
            
            <div className="flex flex-col bg-blue-200 w-3/4 grow">
                <Navbar/>
                <ChatLog messages={defaultMessages}/>
                <div style={{
                    height: "80px",
                    marginTop: "50px"
                }}>
                    <Carousel users={people}/>
                </div>
            </div>
        </div>
    )
}



