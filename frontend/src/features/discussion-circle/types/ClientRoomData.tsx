import { RoomData } from "./RoomData";

export type ClientRoomData = Pick<RoomData, "description" | "isActive" | "maxSize" | "name" | "participants" | "rounds" | "timeLimit">