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
                <div 
                style={{minWidth: 0}}
                className="grow rounded-lg py-1 pr-2
                    border border-white/10 bg-white/5 
                    text-gray-200 placeholder-gray-500 flex">

                    <p className="px-2">🔎</p>

                    <input type="text" placeholder="Search" 
                    className="outline-none"
                    style={{minWidth: 0}}
                    />
                </div>
                {/* Create button */}
                <div className="size-6 shrink-0 hover:bg-gray-200/20 flex items-center justify-center rounded-md">
                    <button className="relative size-6" onClick={onCreateButtonClick}>
                        <Image 
                        src={"/plus-solid-full.svg"}
                        alt="Create"
                        fill={true}
                        style={{filter: "invert(1)"}}
                        />
                    </button>
                </div>
                {/* Reload button */}
                <div className="size-6 shrink-0 hover:bg-gray-200/20 flex items-center justify-center rounded-md">
                    <button className="relative size-5" onClick={onReloadButtonClick}>
                        <Image 
                        src={"/rotate-right-regular-full.svg"}
                        alt="Reload"
                        fill={true}
                        style={{filter: "invert(1)"}}
                        />
                    </button>
                </div>
            </div>

            <div 
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 overflow-x-visible overflow-y scroll"
            style={{scrollbarWidth: "none"}}
            >
                {rooms.map((roomData) => 
                    <RoomListing 
                    key={roomData.id} 
                    roomData={roomData} 
                    onClick={onRoomClick}
                    />
                )}
            </div>
        </div>
    )
}