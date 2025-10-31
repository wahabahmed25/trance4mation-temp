import { useEffect, useState } from "react";
import { ParticipantData } from "../types/ParticipantData"
import { UserData } from "../types/UserData"
import Image from "next/image"

interface ParticipantProps {
    userData: ParticipantData,
    isSpeaker: boolean,
    goalX: number,
    goalY: number
}

export default function Participant({userData, isSpeaker, goalX, goalY}: ParticipantProps) {
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    useEffect(() => {
        setX(goalX)
        setY(goalY)
    }, [goalX, goalY])

    return (
        <div className="absolute transition-transform duration-600 ease-out z-1" style={{
            transform: `translate(${x}px, ${y}px)`
        }}>
            <div className="border-4 rounded-full" style={{borderColor: isSpeaker ? "#FCA17D" : "#066D77"}}>
                <div className="size-16 p-2 rounded-full bg-slate-700">
                    <div className="size-12 relative">
                        <Image
                        src={userData?.icon ?? "/user-regular-full.svg"}
                        alt={userData.name}
                        fill={true}
                        priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}