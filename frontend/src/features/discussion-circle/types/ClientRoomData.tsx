import { RoomData } from "./RoomData";

export type ClientRoomData = Pick<RoomData, "description" | "maxSize" | "name" | "rounds" | "timeLimit">