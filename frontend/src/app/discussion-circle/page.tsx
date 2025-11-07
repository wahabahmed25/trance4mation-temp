"use client";
import { useEffect, useRef, useState } from "react";
import RoomBrowser from "@/features/discussion-circle/components/RoomBrowser";
import RoomCreationMenu from "@/features/discussion-circle/components/RoomCreationMenu";
import Room from "@/features/discussion-circle/components/Room";
import { RoomData } from "@/features/discussion-circle/types/RoomData";
import Welcome from "@/features/discussion-circle/components/Welcome";
import { useAuth } from "@/context/AuthContext";
import { FIREBASE_APP, RoomsContext, useRooms } from "./api";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  getRooms,
  joinRoom,
  leaveRoom,
  skipTurn,
  startGame,
  subscribeToRoom,
} from "./api";

export default function DiscussionCircle() {
  const [isCreationMenuOpen, setCreationMenuOpen] = useState<boolean>(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);
  const [useMobileLayout, setUseMobileLayout] = useState<boolean>(true);
  const rooms = useRooms()

  // if (!user) {
  //     redirect("/")
  // }

  useEffect(() => {
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
    <RoomsContext value={rooms}>
      <div className="w-screen h-screen flex relative"
        style={{ 
          background: "linear-gradient(180deg, #7EC8E3 0%, #FDE7D8 20%, #FDE7D8 55%, #fff7d8ff 100%)" 
        }}
      >
        {isCreationMenuOpen ? (
          <RoomCreationMenu
            onCloseButtonClick={() => setCreationMenuOpen(false)}
          />
        ) : null}
        <div
          className="h-full flex w-full md:w-1/4 p-8 absolute md:relative"
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
              await rooms.leave()
              setIsJoiningRoom(false);
              await rooms.join(roomData.id)
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
    </RoomsContext>
  );
}
