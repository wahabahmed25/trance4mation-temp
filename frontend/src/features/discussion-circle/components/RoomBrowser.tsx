import { RoomData } from "@/features/discussion-circle/types/RoomData";
import RoomListing from "./RoomListing";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { Input } from "@headlessui/react";
import Image from "next/image";

interface RoomBrowserProps {
    rooms: RoomData[],
    onQuery?: ChangeEventHandler<HTMLInputElement>,
    onCreateButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onReloadButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onRoomClick?: (room: RoomData) => void | undefined
}

export default function RoomBrowser({rooms, onQuery, onCreateButtonClick, onReloadButtonClick, onRoomClick}: RoomBrowserProps) {
    return (
        <div className="w-full h-full flex flex-col gap-2 grow">
            <h1 className="font-bold text-3xl text-white">Discussion Circle</h1>
            <div className="flex gap-1 items-center">
                <Input type="text" placeholder="Search" className="bg-slate-900 grow rounded-full text-white px-3 p-1" style={{minWidth: 0}}/>
                <button className="relative size-6 shrink-0" onClick={onCreateButtonClick}>
                    <Image 
                    src={"/plus-solid-full.svg"}
                    alt="Create"
                    fill={true}
                    style={{filter: "invert(1)"}}
                    />
                </button>
                <button className="relative size-5 shrink-0" onClick={onReloadButtonClick}>
                    <Image 
                    src={"/rotate-right-regular-full.svg"}
                    alt="Reload"
                    fill={true}
                    style={{filter: "invert(1)"}}
                    />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {rooms.map((roomData) => 
                    <RoomListing 
                    key={roomData.id} 
                    roomData={roomData} 
                    onClick={onRoomClick}
                    />
                )}
            </div>
        </div>
        // <div className="bg-slate-900 h-full w-1"></div>
    )
}