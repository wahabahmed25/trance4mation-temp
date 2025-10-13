import { RoomData } from "@/features/discussion-circle/types/RoomData"
import Image from "next/image"
import { POPPINS_BOLD, MERRIWEATHER } from "@/app/discussion-circle/defaults"

interface RoomListing {
    roomData: RoomData, 
    onClick?: (room: RoomData) => void | undefined
}

export default function RoomListing({roomData, onClick}: RoomListing) {
    return (
        <div 
        className="rounded-2xl flex flex-col border border-white/10 bg-[#0C1723]/80 p-2 hover:border-white/20"
        onClick={() => onClick ? onClick(roomData): {}}
        >
            <div 
            className="flex grow-2 m-1 rounded-md items-center gap-2 border-white/10">
                <div className="flex flex-col">
                    {/* Room name */}
                    <div className="text-white font-semibold text-lg">
                        {roomData.name}
                    </div>

                    {/* Room description */}
                    <div className={`text-sm ${MERRIWEATHER} text-gray-500`}>
                        {roomData.description}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap grow-1 gap-2 p-1">
                {/* Participant count */}
                <div className="pl-2 pr-3 py-0.5 flex items-center rounded-full bg-white/5 border border-white/10 text-white/70">
                    <Image 
                    src={"/user-regular-full.svg"}
                    alt="participants"
                    width={20}
                    height={20}
                    priority
                    style={{filter: "invert(1)"}}
                    />
                    {roomData.size}
                    /
                    {roomData.maxSize}
                </div>

                {/* Time limit */}
                <div className="pl-2 pr-3 py-0.5 flex items-center rounded-full bg-white/5 border border-white/10 text-white/70">
                    <Image 
                    src={"/alarm-clock-regular-full.svg"}
                    alt="time limit"
                    width={20}
                    height={20}
                    priority
                    style={{filter: "invert(1)"}}
                    />
                    {roomData.timeLimit}s
                </div>

                {/* Number of rounds */}
                <div className="pl-2 pr-3 py-0.5 flex items-center rounded-full bg-white/5 border border-white/10 text-white/70">
                    <Image 
                    src={"/rotate-left-regular-full.svg"}
                    alt="number of rounds"
                    width={20}
                    height={20}
                    priority
                    style={{filter: "invert(1)"}}
                    />
                    {roomData.rounds}
                </div>
            </div>
        </div>
    )
}