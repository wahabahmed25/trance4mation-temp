import { Timestamp } from "firebase/firestore"
import { ParticipantData } from "./ParticipantData"
import { ReactionData } from "./ReactionData"

export type RoomData = {
    id: string,
    description: string,
    isActive: boolean,
    maxSize: number,
    name: string,
    participants: ParticipantData[],
    prompt?: string,
    reaction?: ReactionData
    rounds: number, 
    roundsLeft?: number,
    speakerIndex: number,
    speakerStart: Timestamp
    timeLimit: number,
}