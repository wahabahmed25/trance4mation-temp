"use client";
import { useEffect, useRef, useState } from "react";
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser";
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu";
import Room from "@/features/discussion-circle/components/Room";
import { RoomData } from "@/features/discussion-circle/types/RoomData";
import Welcome from "@/features/discussion-circle/components/Welcome";
import { useRooms } from "./api";
import { Timestamp } from "firebase/firestore";

export default function DiscussionCircle() {
  const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false); // is the creation menu open?
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);         // is the user in the middle of joining a room?
  const [useMobileLayout, setUseMobileLayout] = useState<boolean>(true);      // should we use the mobile layout?
  const rooms = useRooms()  // a custom hook that provides functions for interacting with the rooms collection in Firestore
  const queryTimeout = useRef<NodeJS.Timeout>(undefined)

  // if the user is not logged in, send them to the home screen. Uncommented for testing
  // if (!user) {
  //     redirect("/")
  // }

  useEffect(() => {
    // if the window width is less than 768 (which is also the md breakpoint in tailwind), use the mobile layout
    function onResize() {
      setUseMobileLayout(window.innerWidth < 768);
    }
    window.addEventListener("resize", onResize);
    onResize()

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex relative"
      style={{ 
        background: "linear-gradient(180deg, #7EC8E3 0%, #FDE7D8 20%, #FDE7D8 55%, #fff7d8ff 100%)" 
      }}
    >
      {isCreationMenuOpen ? (
        <RoomCreationMenu
          onCloseButtonClick={() => setCreationMenuOpen(false)}
          onCreateButtonClick={rooms.create}
        />
      ) : null}
      <div
        className="h-full flex w-full md:w-1/4 p- absolute md:relative"
        style={{
          display: rooms.current && useMobileLayout ? "none" : "block",
        }}
      >
        <RoomBrowser
          rooms={rooms.listings}
          onCreateButtonClick={() => setCreationMenuOpen(true)}
          onReloadButtonClick={rooms.reload}
          onRoomClick={async (roomData: RoomData) => {
            setIsJoiningRoom(true);
            await rooms.join(roomData.id)
            setIsJoiningRoom(false);
          }}
          onQuery={(event) => {
            // on change, set a timeout for some time. If no changes are made within that time, then the query goes through
            clearTimeout(queryTimeout.current)
            queryTimeout.current = setTimeout(() => {
              const query = event.target.value
              rooms.search(query)
            }, 700)
          }}
        />
      </div>

      <div
        className="grow h-full p-8 md:block"
        style={{
          opacity: isJoiningRoom ? 0.7 : 1,
        }}
      >
        {rooms.current ? (
          <Room
            roomData={rooms.current}
            onExitButtonClick={rooms.leave}
            onStartButtonClick={rooms.startGame}
            onSkipButtonClick={rooms.skipTurn}
          />
        ) 
        : !useMobileLayout ? (
          <Welcome />
        )
        : (
          null
        )}
      </div>
    </div>
  );
}
