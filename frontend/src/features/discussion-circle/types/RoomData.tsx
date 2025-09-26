import { MessageData } from "./MessageData"
import { RoomSettings } from "./RoomSettings"
import { UserData } from "./UserData"

export type RoomData = RoomSettings & {
    numParticipants: number,
    code: string,
    messages?: MessageData[],
    participants?: UserData[],
    currentSpeaker?: UserData
}