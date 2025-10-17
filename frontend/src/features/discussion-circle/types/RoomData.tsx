import { Timestamp } from "firebase/firestore"
import { ParticipantData } from "./ParticipantData"

export type RoomData = {
    id: string,
    description: string,
    isActive: boolean,
    maxSize: number,
    name: string,
    participants: ParticipantData[],
    prompt: string,
    rounds: number, 
    speakerIndex: number,
    speakerStart: Timestamp
    timeLimit: number,
}