import { RoomData } from "./RoomData"

export type RoomsContextData = {
    listings: RoomData[],
    current: RoomData | undefined,
    fetch: Function,
    reload: Function,
    join: Function,
    leave: Function,
    create: Function,
    startGame: Function,
    skipTurn: Function
}