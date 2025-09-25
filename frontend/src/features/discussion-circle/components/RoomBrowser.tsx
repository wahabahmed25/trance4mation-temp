import { Room } from "@/features/discussion-circle/types/Room";
import RoomListing from "./RoomListing";
import Search from "./Search";
import { TEAL, PURPLE, BLUE } from "@/app/discussion-circle/defaults";
import { ChangeEventHandler, InputEventHandler, MouseEventHandler } from "react";

interface RoomBrowserProps {
    rooms: Room[],
    onQuery?: ChangeEventHandler<HTMLInputElement>,
    onCreateButtonClick?: MouseEventHandler<HTMLImageElement>,
    onRoomClick?: (room: Room) => void | undefined
}

export default function RoomBrowser({rooms, onQuery, onCreateButtonClick, onRoomClick}: RoomBrowserProps) {
    return (
        <div 
        style={{borderRight: `2px solid ${TEAL}`}}
        className="w-1/4 flex flex-col">
            <Search onQuery={onQuery} onCreateButtonClick={onCreateButtonClick}/>
            <div 
            style={{backgroundColor: BLUE}}
            className="flex flex-col grow p-2 gap-2">
                {rooms.map((room) => <RoomListing room={room} key={room.code} onRoomClick={onRoomClick}/>)}
            </div>
        </div> 
    )
}