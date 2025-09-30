import { MessageData } from "./MessageData"
import { UserData } from "./UserData"

export type RoomData = {
    id: string,
    description: string,
    isAnonymous: boolean,
    maxSize: number,
    name: string,
    palette: string,
    rounds: number, 
    size: number,
    time: number
}