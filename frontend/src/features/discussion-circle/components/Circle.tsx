import { ParticipantData } from "../types/ParticipantData";
import Participant from "./Participant";
import Speaker from "./Speaker";

const radius = 120

interface CircleProps {
    speaker: ParticipantData | undefined, 
    participants: ParticipantData[], 
    timeLimit: number, 
    timeLeft: number
}

export default function Circle({speaker, participants, timeLimit, timeLeft}: CircleProps) {
    return (
        <div className="grow flex justify-center items-center">
            {participants.map((participant, index) => {
                const baseAngle = 2 * Math.PI / participants.length
                const angle = baseAngle * index
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

            <div className="absolute">
                <Speaker userData={speaker} timeLeft={timeLeft} timeLimit={timeLimit}/>
            </div>
        </div>
    )
    
}