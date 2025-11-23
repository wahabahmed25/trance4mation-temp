import { Timestamp } from "firebase/firestore"
import { ParticipantData } from "./ParticipantData"
import { ReactionData } from "./ReactionData"

export type RoomData = {
    id: string,                         // document id of the room  
    description: string,                // description of the room
    expiresAt: Timestamp | undefined,   // when the room is set to be deleted
    isActive: boolean,                  // is the game ongoing? initially false and becomes true when someone requests to start the game
    isVisible: boolean,                 // should the room show up in browsing?
    maxSize: number,                    // max number of participants in the room
    name: string,                       // name of this room
    participants: ParticipantData[],    // list of participants in the room
    prompt?: string,                    // current prompt. Initially undefined and is set when the game starts
    reaction?: ReactionData             // what the latest reaction used is, and when it was used
    rounds: number,                     // max number of rounds to play
    roundsLeft?: number,                // number of rounds left to play. Initially undefined and is set when the game starts
    speakerIndex: number,               // index of the current speaker in the participants array
    speakerStart: Timestamp,            // when the current speaker started speaking
    timeLimit: number,                  // how much time the speaker has to speak
    url?: string;
}