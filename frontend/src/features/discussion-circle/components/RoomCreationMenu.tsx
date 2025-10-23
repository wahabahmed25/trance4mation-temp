import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { Input, Textarea } from "@headlessui/react";
import SettingsCell from "./SettingsCell";
import { useAuth } from "@/context/AuthContext";
import { RoomSetting } from "../types/RoomSetting";
import { ClientRoomData } from "../types/ClientRoomData";
import IconButton from "./IconButton";

interface RoomCreationMenuProps {
    onCloseButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onConfirmButtonClick?: (roomData: ClientRoomData) => void 
}

const SETTINGS: RoomSetting[] = [
    {
        image: "/user-regular-full.svg",
        label: "Participants",
        field: "maxSize",
        type: "number",
        defaultValue: 5
    },
    {
        image: "/alarm-clock-regular-full.svg",
        label: "Time Limit",
        field: "timeLimit",
        type: "number",
        defaultValue: 30,
        step: 5
    },
    {
        image: "/rotate-left-regular-full.svg",
        label: "Rounds",
        field: "rounds",
        type: "number",
        defaultValue: 3
    },
]

const DEFAULT_SETTINGS = {
    description: "",
    maxSize: 5,
    name: "",
    rounds: 3, 
    timeLimit: 30
}

const initialYOffset = 30
const initialOpacity = 0.2

export default function RoomCreationMenu({onCloseButtonClick, onConfirmButtonClick}: RoomCreationMenuProps) {
    const [settings, setSettings] = useState<ClientRoomData>(DEFAULT_SETTINGS)
    const [yOffset, setYOffset] = useState(initialYOffset)
    const [opacity, setOpacity] = useState(initialOpacity)
    const user = useAuth()

    useEffect(() => {
        setYOffset(0)
        setOpacity(1)
    }, [])

    function changeSetting(setting: string, value: string | number | boolean | undefined) {
        setSettings({
            ...settings,
            [setting]: value
        })
    }

    return (
        <div className="py-40 px-8 absolute z-2 w-screen h-screen flex items-center justify-center bg-slate-900/50">
            <div className="flex 
            shadow-[0_0_10px_rgba(255,111,97,0.4)]
            rounded-xl p-8 grow max-w-120 transition"
            style={{
                transitionDuration: "0.3s", transitionTimingFunction: "ease-out", 
                transform: `translateY(${yOffset}px)`,
                opacity: opacity,
                background: "linear-gradient(135deg, #FDE7D8 0%, #FFF7D8 100%)"
            }}
            >
                <div 
                className="flex flex-col grow h-full gap-4">
                    <div className="flex items-center">
                        <h1 className="text-[#FCA17D] font-bold text-3xl grow">Create a Room</h1>
                        {/* Close modal button */}
                        <IconButton
                        imageSrc={"/xmark-solid-full.svg"}
                        imageSize={8}
                        buttonSize={10}
                        onClick={onCloseButtonClick}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <input
                        placeholder="Room Name"
                        className="text-black/80 text-base p-1 px-2 outline-none
                        border-b-2 border-[rgba(252,161,125,0.5)] rounded-sm
                        "
                        onChange={(event) => changeSetting("name", event.target.value)}
                        />
                        
                        <Textarea 
                        className="p-2 grow text-base text-black/80 bg-white/60 outline-none
                        rounded-sm shadow-xs shadow-[#FCA17D]
                        "
                        placeholder="Description"
                        style={{
                            resize: "none",
                        }}
                        onChange={(event) => changeSetting("description", event.target.value)}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {SETTINGS.map((setting) => <SettingsCell key={setting.field} setting={setting} onChange={changeSetting}/>)}
                    </div>

                    {/* Create Button */}
                    <div className="flex justify-center grow items-end hover:scale-103 transition"
                    style={{transitionTimingFunction: "ease-out"}}
                    >
                        <button
                        className="p-1 w-40 cursor-pointer 
                        font-bold text-xl text-white text-center
                        shadow-[0_0_10px_rgba(255,111,97,0.4)] rounded-xl 
                        "
                        style={{background: "linear-gradient(135deg, #FCA17D 0%, #F6765E 100%)"}}
                        onClick={() => {
                            if (!onConfirmButtonClick || !user.user) {
                                return
                            }
                            onConfirmButtonClick({
                                ...settings,
                            })
                        }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}