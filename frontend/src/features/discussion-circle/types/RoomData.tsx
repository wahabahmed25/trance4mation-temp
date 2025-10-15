import { Timestamp } from "firebase/firestore"

export type RoomData = {
    id: string,
    description: string,
    isAnonymous: boolean,
    maxSize: number,
    name: string,
    palette: string,
    rounds: number, 
    size: number,
    timeLimit: number,
    creator?: string,
    speakerStart?: Timestamp
}