'use client'
import { useEffect, useState } from "react"
import { User } from "@/types/User"
import Carousel from '@/components/discussion-circle/Carousel'
import ChatLog from '@/components/discussion-circle/ChatLog'
import Navbar from '@/components/discussion-circle/Navbar'
import RoomListing from '@/components/discussion-circle/RoomListing'
import Search from '@/components/discussion-circle/Search'
import { defaultRooms, defaultMessages, defaultPeople } from './defaults'
import Rooms from "@/components/discussion-circle/Rooms"


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



