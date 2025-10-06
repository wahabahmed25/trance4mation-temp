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
        className="flex flex-col rounded-md border-2 bg-slate-900 border-slate-800"
        onClick={() => onClick ? onClick(roomData): {}}
        >
            <div 
            className="flex grow-2 m-1 rounded-md items-center p-2 gap-2 bg-slate-950">
                <div className="flex flex-col">
                    {/* Room name */}
                    <div className={`text-base ${POPPINS_BOLD.className} text-white`}>
                        {roomData.name}
                    </div>

                    {/* Room description */}
                    <div className={`text-sm ${MERRIWEATHER} text-gray-500`}>
                        {roomData.description}
                    </div>
                </div>
            </div>

            <div className="flex grow-1 gap-4 p-1">
                {/* Participant count */}
                <div className={`flex items-center w-12 ${MERRIWEATHER} text-white`}>
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
                <div className={`flex items-center w-12 ${MERRIWEATHER} text-white`}>
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
                <div className={`flex items-center w-8 ${MERRIWEATHER} text-white`}>
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

                {/* Anonymity */}
                {roomData.isAnonymous
                    ? <div className={`flex items-center w-6 shrink-0`}>
                        <Image 
                        src={"/mask-solid-full.svg"}
                        alt="isAnonymous"
                        width={20}
                        height={20}
                        priority
                        style={{filter: "invert(1)"}}
                        />
                        {/* {roomData.rounds} */}
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}