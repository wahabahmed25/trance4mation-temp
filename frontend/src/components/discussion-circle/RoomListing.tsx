import { Room } from "@/types/Room"
import Image from "next/image"

export default function RoomListing({room}: {room: Room}) {
    return (
        <div className="flex flex-col bg-blue-200 rounded-md">
            <div className="flex grow-2 bg-blue-100 m-1 rounded-md items-center px-1 gap-2">
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
                    <div className="text-base">
                        {room.name}
                    </div>

                    {/* Room description */}
                    <div className="text-sm">
                        {room.description}
                    </div>
                </div>
            </div>

            <div className="flex grow-1 gap-4">
                {/* Participant count */}
                <div className="flex items-center w-12">
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
                <div className="flex items-center w-12">
                    <Image 
                    src={"/alarm-clock-regular-full.svg"}
                    alt="participants"
                    width={20}
                    height={20}
                    priority
                    />
                    {room.timeLimit}s
                </div>

                {/* Number of rounds */}
                <div className="flex items-center w-12">
                    <Image 
                    src={"/rotate-left-regular-full.svg"}
                    alt="participants"
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