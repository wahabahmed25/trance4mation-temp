import { RoomData } from "@/features/discussion-circle/types/RoomData";
import { useEffect, useState } from "react";
import Tag from "./Tag";

interface RoomListing {
  roomData: RoomData;
  onClick?: (room: RoomData) => unknown;
}

// TODO: Convert this component to use motion.div for consistency
export default function RoomListing({ roomData, onClick }: RoomListing) {
  const size = roomData.participants.length;
  const [yOffset, setYOffset] = useState(10);
  const [opacity, setOpacity] = useState(0.2);

  useEffect(() => {
    setYOffset(0);
    setOpacity(1);
  }, []);

  return (
    <div
      className="rounded-2xl flex flex-col p-2 
        hover:scale-103 transition
        bg-white/60
        shadow-xs shadow-[#FCA17D]
      "
      style={{
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease-out",
        transform: `translateY(${yOffset}px)`,
        opacity: opacity,
      }}
      onClick={() => (onClick ? onClick(roomData) : {})}
    >
      <div className="flex grow-2 m-1 rounded-md items-center gap-2 border-white/10">
        <div className="flex flex-col">
          {/* Room name */}
          <div className="text-[#FCA17D] font-semibold text-lg">
            {roomData.name}
          </div>

          {/* Room description */}
          <div className="text-sm text-gray-500">{roomData.description}</div>
        </div>
      </div>

      <div className="flex flex-wrap grow-1 gap-2 p-1">
        {/* Participant count */}
        <Tag
          imageSrc={"/user-regular-full.svg"}
          text={`${size}/${roomData.maxSize}`}
        />

        {/* Time limit */}
        <Tag
          imageSrc={"/alarm-clock-regular-full.svg"}
          text={`${roomData.timeLimit}s`}
        />

        {/* Number of rounds */}
        <Tag
          imageSrc={"/rotate-left-regular-full.svg"}
          text={`${roomData.rounds}`}
        />
      </div>
    </div>
  );
}
