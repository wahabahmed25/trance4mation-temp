import { Timestamp } from "firebase/firestore"
import { ParticipantData } from "./ParticipantData"

export type RoomData = {
    id: string,
    description: string,
    maxSize: number,
    name: string,
    rounds: number, 
    timeLimit: number,
    speakerStart: Timestamp
    participants: ParticipantData[],
    speakerIndex: number
    prompt: string
}