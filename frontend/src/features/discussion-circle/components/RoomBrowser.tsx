import { RoomData } from "@/features/discussion-circle/types/RoomData";
import RoomListing from "./RoomListing";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { POPPINS_BOLD } from "@/app/discussion-circle/constants";
import IconButton from "./IconButton";

interface RoomBrowserProps {
  rooms: RoomData[];
  onQuery?: ChangeEventHandler<HTMLInputElement>;
  onCreateButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onReloadButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onRoomClick?: (room: RoomData) => unknown;
}

export default function RoomBrowser({
  rooms,
  onQuery,
  onCreateButtonClick,
  onReloadButtonClick,
  onRoomClick,
}: RoomBrowserProps) {
  return (
    <div className="w-full h-full flex flex-col gap-2 grow">
      <h1
        className={`font-bold text-3xl text-[#FCA17D] ${POPPINS_BOLD.className}`}
      >
        Discussion Circle
      </h1>
      <div className="flex gap-1 items-center">
        {/* Search bar */}
        <div
          style={{ minWidth: 0 }}
          className="
            grow rounded-lg py-1 pr-2
            border border-[#000]/10 bg-white/80
            text-black/80 placeholder-gray-500 flex
          "
        >
          <p className="px-2">🔎</p>

          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            style={{ minWidth: 0 }}
            onChange={onQuery}
          />
        </div>

        {/* Create button */}
        <IconButton
          imageSrc={"/plus-solid-full.svg"}
          onClick={onCreateButtonClick}
          buttonSize={6}
          imageSize={6}
        />

        {/* Reload button */}
        {/* <Image src={"/rotate-right-regular-full.svg"} alt="a" width={20} height={20}/> */}
        <IconButton
          imageSrc={"/rotate-right-regular-full.svg"}
          onClick={onReloadButtonClick}
          buttonSize={6}
          imageSize={5}
        />
      </div>

      <div
        className="
          grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 
          overflow-y-scroll
        "
        style={{ scrollbarWidth: "none" }}
      >
        {rooms.map((roomData) => (
          <RoomListing
            key={roomData.id}
            roomData={roomData}
            onClick={onRoomClick}
          />
        ))}
      </div>
    </div>
  );
}
