import { MessageData } from "./MessageData"
import { UserData } from "./UserData"

export type RoomData = {
    isAnonymous: boolean,
    maxParticipants: number,
    colorTheme: string,
    timeLimit: number,
    rounds: number,
    name: string,
    icon: string,
    description: string,

    numParticipants?: number,
    code?: string,
    messages?: MessageData[],
    participants?: UserData[],
    currentSpeaker?: UserData
}