import { Message } from "@/features/discussion-circle/types/Message"
import { Room } from "@/features/discussion-circle/types/Room"
import { User } from "@/features/discussion-circle/types/User"
import { Poppins, Merriweather } from "next/font/google"

export const POPPINS_BOLD = Poppins({
    weight: "700"
})
export const MERRIWEATHER = Merriweather({
    weight: "400"
})

export const RED = "#ff8661"
export const TEAL = "#006D77"
export const YELLOW = "#FFD166"
export const BLUE = "#55CCF2"
export const PURPLE = "#985DE5"

export const defaultPeople: User[] = [
    {name: "John", icon: "/vercel.svg", id: 0},
    {name: "Jane", icon: "/window.svg", id: 1},
    {name: "Jerry", icon: "/next.svg", id: 2},
    {name: "Joe", icon: "/vercel.svg", id: 3},
    {name: "Jill", icon: "/window.svg", id: 4},
]

export const defaultMessages: Message[] = [
    {text: "i am john", sender: defaultPeople[0], id: 0},
    {text: "jane am i", sender: defaultPeople[1], id: 1},
    {text: "Donec efficitur mattis nibh nec gravida. Phasellus varius lorem vel turpis convallis scelerisque.", 
        sender: defaultPeople[2], id: 2}
]

export const defaultRooms: Room[] = [
    {
        isAnonymous: false,
        numParticipants: 2,
        maxParticipants: 3,
        colorTheme: "idk",
        timeLimit: 10,
        rounds: 3,
        code: "ABCD",
        name: "counseling",
        icon: "/vercel.svg",
        description: "this is a room to talk about school"
    },
    {
        isAnonymous: true,
        numParticipants: 3,
        maxParticipants: 4,
        colorTheme: "idk",
        timeLimit: 5,
        rounds: 3,
        code: "EFGH",
        name: "philosophical cookies",
        icon: "/next.svg",
        description: "this is a room to talk about the meaning of life and also cookie recipes"
    },
    {
        isAnonymous: true,
        numParticipants: 3,
        maxParticipants: 4,
        colorTheme: "idk",
        timeLimit: 5,
        rounds: 3,
        code: "IJKL",
        name: "room 1",
        icon: "/window.svg",
        description: ""
    },
]