import { MouseEventHandler, useEffect, useRef, useState } from "react";
import SettingsCell from "./SettingsCell";
import { ClientRoomData } from "../types/ClientRoomData";
import IconButton from "./IconButton";
import { motion } from "framer-motion";
import { DEFAULT_SETTINGS, SETTINGS } from "@/app/discussion-circle/constants";

interface RoomCreationMenuProps {
  onCloseButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onCreateButtonClick?: (settings: ClientRoomData) => void
  onRoomCreated?: () => void;
}

export default function RoomCreationMenu({
  onCloseButtonClick,
  onCreateButtonClick,
  onRoomCreated,
}: RoomCreationMenuProps) {
  const [settings, setSettings] = useState<ClientRoomData>(DEFAULT_SETTINGS);       // settings that will be sent to the backend when creating a room
  const [isLoading, setLoading] = useState<boolean>(false);                         // are we waiting for a response from the server telling us our room was created
  const [createButtonMessage, setCreateButtonMessage] = useState<string>("Create"); // The text displayed on the create button
  const [errorMessage, setErrorMessage] = useState<string>("");                     // The error message that displays when fail to create a room
  const updateMessage = useRef<NodeJS.Timeout>(undefined);                          // an interval used to update createButtonMessage when we are waiting on the server

  function changeSetting(
    setting: string,
    value: string | number | boolean | undefined
  ) {
    setSettings({
      ...settings,
      [setting]: value,
    });
  }

  // When isLoading is set to true, cycle createButtonMessage between ".", "..", and "..."
  // When isLoading is set to false, clear the interval that's cycling createButtonMessage and set the message back to normal
  useEffect(() => {
    if (isLoading) {
      setCreateButtonMessage(".");
      setErrorMessage("");
      clearInterval(updateMessage.current);
      const intervalId = setInterval(() => {
        console.log("hi");
        setCreateButtonMessage((curr) => {
          if (curr === ".") {
            return "..";
          }
          if (curr === "..") {
            return "...";
          }
          if (curr === "...") {
            return ".";
          }
          return ".";
        });
      }, 500);
      updateMessage.current = intervalId;
    } else {
      clearInterval(updateMessage.current);
      setCreateButtonMessage("Create");
    }
  }, [isLoading]);

  return (
    <div
      className="
        py-40 px-8 absolute z-2 w-screen h-screen 
        flex items-center justify-center 
        bg-slate-900/50
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "linear-gradient(135deg, #FDE7D8 0%, #FFF7D8 100%)",
        }}
        className="
          flex flex-col p-8 gap-2 grow
          max-w-120 rounded-xl 
          shadow-[0_0_10px_rgba(255,111,97,0.4)]
        "
      >
        <div className="flex items-center">
          <h1 className="text-[#FCA17D] font-bold text-3xl grow">
            Create a Room
          </h1>
          {/* Close modal button */}
          <IconButton
            imageSrc={"/xmark-solid-full.svg"}
            imageSize={8}
            buttonSize={10}
            onClick={onCloseButtonClick}
          />
        </div>

        <input
          placeholder="Room Name"
          className="
            text-black/80 text-base p-1 px-2 outline-none
            border-b-2 border-[rgba(252,161,125,0.5)] rounded-sm
          "
          onChange={(event) => changeSetting("name", event.target.value)}
        />

        <input
          placeholder="Link to your Google Meet, Zoom, etc."
          className="
            text-black/80 text-base p-1 px-2 outline-none
            border-b-2 border-[rgba(252,161,125,0.5)] rounded-sm
          "
          onChange={(event) => changeSetting("url", event.target.value)}
        />

        <textarea
          className="
            p-2 grow outline-none
            text-base text-black/80 bg-white/60
            rounded-sm shadow-xs shadow-[#FCA17D]
          "
          placeholder="Description"
          style={{
            resize: "none",
          }}
          onChange={(event) => changeSetting("description", event.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SETTINGS.map((setting) => (
            <SettingsCell
              key={setting.field}
              setting={setting}
              onChange={changeSetting}
            />
          ))}
        </div>

        <div className="text-center text-red-600">{errorMessage}</div>

        <div className="flex justify-center">
          <button
            style={{
              background: "linear-gradient(135deg, #FCA17D 0%, #F6765E 100%)",
            }}
            onClick={async () => {
              if (isLoading) {
                return;
              }

              setLoading(true)
              await onCreateButtonClick?.(settings)
              setLoading(false)
              onRoomCreated?.()
            }}
            className="
              p-1 w-40 cursor-pointer 
              font-bold text-xl text-white text-center
              shadow-[0_0_10px_rgba(255,111,97,0.4)] rounded-xl 
              hover:scale-103 transition
            "
          >
            {createButtonMessage}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
