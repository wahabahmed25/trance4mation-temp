import { ParticipantData } from "../types/ParticipantData"
import { UserData } from "../types/UserData"
import Image from "next/image"

interface ParticipantProps {
    userData: ParticipantData,
    isSpeaker: boolean
}

export default function Participant({userData, isSpeaker}: ParticipantProps) {
    return (
        <div className="border-3 rounded-full" style={{borderColor: isSpeaker ? "#FFD166" : "#066D77"}}>
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
    )
}