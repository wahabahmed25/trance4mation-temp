import { Timestamp } from "firebase/firestore";
import { ParticipantData } from "../types/ParticipantData";
import { RoomData } from "../types/RoomData";
import Participant from "./Participant";
import Speaker from "./Speaker";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

const radius = 120

interface CircleProps {
    roomData: RoomData,
    onStartButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Circle({roomData, onStartButtonClick}: CircleProps) {
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const speaker = roomData.isActive ? roomData.participants[roomData.speakerIndex] : undefined

    useEffect(() => {
        if (!roomData.isActive) {
            return  
        }

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
    }, [roomData.speakerStart, roomData.timeLimit, roomData.isActive])

    return (
        <div className="grow flex justify-center items-center">
            {roomData.participants.map((participant, index) => {
                const baseAngle = 2 * Math.PI / roomData.participants.length
                const angle = baseAngle * index - Math.PI / 2
                const xTranslate = radius * Math.cos(angle)
                const yTranslate = radius * Math.sin(angle)
                const isSpeaker = participant.uid === speaker?.uid

                return(
                    <div key={participant.uid} className="absolute" style={{
                        transform: `translate(${xTranslate}px, ${yTranslate}px)`
                    }}>
                        <Participant userData={participant} isSpeaker={isSpeaker}/>
                    </div>
                )}
            )}

            {roomData.isActive ?
                <div className="absolute">
                    <Speaker userData={speaker} timeLeft={timeLeft} timeLimit={roomData.timeLimit}/>
                </div>
            :   <button 
                className="flex absolute text-6xl items-center justify-center cursor-pointer"
                onClick={onStartButtonClick}
                >
                   ▶️
                </button>
            }
        </div>
    )
}