import { Timestamp } from "firebase/firestore";
import { ParticipantData } from "../types/ParticipantData";
import { RoomData } from "../types/RoomData";
import Participant from "./Participant";
import Speaker from "./Speaker";
import { useEffect, useRef, useState } from "react";

const radius = 120

export default function Circle({roomData}: {roomData : RoomData}) {
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const speaker = roomData.participants[roomData.speakerIndex]

    useEffect(() => {
        const timerId = setInterval(() => {
            const timeElapsed = Timestamp.now().seconds - roomData.speakerStart.seconds
            setTimeLeft(Math.max(0, roomData?.timeLimit - timeElapsed))

            if (timeElapsed >= roomData?.timeLimit) {
                clearInterval(timerId)
            }
        })

        return () => {
            clearInterval(timerId)
        }
    }, [roomData.speakerStart, roomData.timeLimit])

    return (
        <div className="grow flex justify-center items-center">
            {roomData.participants.map((participant, index) => {
                const baseAngle = 2 * Math.PI / roomData.participants.length
                const angle = baseAngle * index
                const xTranslate = radius * Math.cos(angle)
                const yTranslate = radius * Math.sin(angle)
                const isSpeaker = participant.uid === speaker.uid

                return(
                    <div key={participant.uid} className="absolute" style={{
                        transform: `translate(${xTranslate}px, ${yTranslate}px)`
                    }}>
                        <Participant userData={participant} isSpeaker={isSpeaker}/>
                    </div>
                )}
            )}

            <div className="absolute">
                <Speaker userData={speaker} timeLeft={timeLeft} timeLimit={roomData.timeLimit}/>
            </div>
        </div>
    )
    
}