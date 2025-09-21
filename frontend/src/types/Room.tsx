export type Room = {
    isAnonymous: boolean,
    numParticipants: number,
    maxParticipants: number,
    colorTheme: string,
    timeLimit: number,
    rounds: number,
    code: string,
    name: string,
    icon: string,
    description: string
}