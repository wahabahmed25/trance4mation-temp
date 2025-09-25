import { User } from "@/features/discussion-circle/types/UserData"

export type MessageData = {
    text: string,
    sender: User,
    id: number
}