import { RoomData } from "./RoomData";

export type RoomsContextData = {
  listings: RoomData[];
  current: RoomData | undefined;
  fetch: () => Promise<void>;
  reload: () => void;
  join: (roomId: string) => Promise<void>;
  leave: (roomId: string) => Promise<void>;
  create: (roomName: string) => Promise<void>;
  startGame: () => void;
  skipTurn: () => void;
};
