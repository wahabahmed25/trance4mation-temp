import { RoomData } from "@/features/discussion-circle/types/RoomData"
import Image from "next/image"
import { RED, YELLOW, POPPINS_BOLD, MERRIWEATHER, TEAL } from "@/app/discussion-circle/defaults"

interface RoomListing {
    roomData: RoomData, 
    onClick?: (room: RoomData) => void | undefined
}

export default function RoomListing({roomData, onClick}: RoomListing) {
    return (
        <div 
        style={{
            backgroundColor: YELLOW,
            borderColor: TEAL
        }}
        className="flex flex-col rounded-md border-2"
        onClick={() => onClick ? onClick(roomData): {}}
        >
            <div 
            style={{backgroundColor: RED}}
            className="flex grow-2 m-1 rounded-md items-center px-1 gap-2">
                {/* Room icon */}
                {/* <Image 
                src={roomData.icon}
                alt="Sidebar"
                width={20}
                height={20}
                priority
                /> */}

                <div className="flex flex-col">
                    {/* Room name */}
                    <div className={`text-base ${POPPINS_BOLD.className}`}>
                        {roomData.name}
                    </div>

                    {/* Room description */}
                    <div className={`text-sm ${MERRIWEATHER}`}>
                        {roomData.description}
                    </div>
                </div>
            </div>

            <div className="flex grow-1 gap-4">
                {/* Participant count */}
                <div className={`flex items-center w-12 ${MERRIWEATHER}`}>
                    <Image 
                    src={"/user-regular-full.svg"}
                    alt="participants"
                    width={20}
                    height={20}
                    priority
                    />
                    {roomData.size}
                    /
                    {roomData.maxSize}
                </div>

                {/* Time limit */}
                <div className={`flex items-center w-12 ${MERRIWEATHER}`}>
                    <Image 
                    src={"/alarm-clock-regular-full.svg"}
                    alt="time limit"
                    width={20}
                    height={20}
                    priority
                    />
                    {roomData.timeLimit}s
                </div>

                {/* Number of rounds */}
                <div className={`flex items-center w-12 ${MERRIWEATHER}`}>
                    <Image 
                    src={"/rotate-left-regular-full.svg"}
                    alt="number of rounds"
                    width={20}
                    height={20}
                    priority
                    />
                    {roomData.rounds}
                </div>

                {/* Anonymity */}
                {roomData.isAnonymous
                    ? <div className={`flex items-center w-12 ${MERRIWEATHER}`}>
                        <Image 
                        src={"/mask-solid-full.svg"}
                        alt="isAnonymous"
                        width={20}
                        height={20}
                        priority
                        />
                        {/* {roomData.rounds} */}
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}