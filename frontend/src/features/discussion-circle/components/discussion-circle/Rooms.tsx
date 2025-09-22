import { Room } from "@/features/discussion-circle/types/Room";
import RoomListing from "./RoomListing";
import Search from "./Search";

export default function Rooms({rooms}: {rooms: Room[]}) {
    return (
        <div className="bg-red-200 w-1/4 flex flex-col">
            <Search/>
            <div className="flex flex-col grow bg-blue-400 p-1 gap-1">
                {rooms.map((room) => <RoomListing room={room} key={room.code}/>)}
            </div>
        </div> 
    )
}