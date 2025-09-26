import { UserData } from "@/features/discussion-circle/types/UserData"

export type MessageData = {
    text: string,
    sender: UserData,
    id: number
}