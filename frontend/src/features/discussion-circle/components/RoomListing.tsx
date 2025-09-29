import { RoomData } from "@/features/discussion-circle/types/RoomData"
import Image from "next/image"
import { RED, YELLOW, POPPINS_BOLD, MERRIWEATHER, TEAL } from "@/app/discussion-circle/defaults"

interface RoomListing {
    room: RoomData, 
    onRoomClick?: (room: RoomData) => void | undefined
}

export default function RoomListing({room, onRoomClick}: RoomListing) {
    return (
        <div 
        style={{
            backgroundColor: YELLOW,
            borderColor: TEAL
        }}
        className="flex flex-col rounded-md border-2"
        onClick={() => onRoomClick ? onRoomClick(room): {}}
        >
            <div 
            style={{backgroundColor: RED}}
            className="flex grow-2 m-1 rounded-md items-center px-1 gap-2">
                {/* Room icon */}
                <Image 
                src={room.icon}
                alt="Sidebar"
                width={20}
                height={20}
                priority
                />

                <div className="flex flex-col">
                    {/* Room name */}
                    <div className={`text-base ${POPPINS_BOLD.className}`}>
                        {room.name}
                    </div>

                    {/* Room description */}
                    <div className={`text-sm ${MERRIWEATHER}`}>
                        {room.description}
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
                    {room.numParticipants}
                    /
                    {room.maxParticipants}
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
                    {room.timeLimit}s
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
                    {room.rounds}
                </div>
            </div>
        </div>
    )
}