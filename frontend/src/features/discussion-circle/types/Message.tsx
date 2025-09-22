import { User } from "@/features/discussion-circle/types/User"

export type Message = {
    text: string,
    sender: User,
    id: number
}