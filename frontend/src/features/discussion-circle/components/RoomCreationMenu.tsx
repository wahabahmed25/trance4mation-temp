import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { Input, Textarea } from "@headlessui/react";
import SettingsCell from "./SettingsCell";
import { useAuth } from "@/context/AuthContext";
import { RoomSetting } from "../types/RoomSetting";
import { ClientRoomData } from "../types/ClientRoomData";

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
    // id: string,
    // isActive: false,
    maxSize: 5,
    name: "",
    // participants: [],
    // prompt: string,
    rounds: 3, 
    // speakerIndex: number,
    // speakerStart: Timestamp
    timeLimit: 30
}

export default function RoomCreationMenu({onCloseButtonClick, onConfirmButtonClick}: RoomCreationMenuProps) {
    const [settings, setSettings] = useState<ClientRoomData>(DEFAULT_SETTINGS)
    const user = useAuth()

    function changeSetting(setting: string, value: string | number | boolean | undefined) {
        setSettings({
            ...settings,
            [setting]: value
        })
    }

    return (
        <div className="flex flex-col grow h-full gap-4">
            <div className="flex items-center">
                <h1 className="text-white font-bold text-3xl grow">Create a Room</h1>
                <button className="relative size-8 shrink-0" onClick={onCloseButtonClick}>
                    <Image 
                    src={"/xmark-solid-full.svg"}
                    alt="close"
                    fill={true}
                    style={{filter: "invert(1)"}}
                    />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <Input
                placeholder="Room Name"
                className={`text-white text-base p-1 px-2 border-b-2 border-slate-600 outline-none`}
                onChange={(event) => changeSetting("name", event.target.value)}
                />
                
                <Textarea 
                className="border-2 rounded-sm p-2 grow text-base bg-slate-900 text-white border-slate-600 outline-none"
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

            <div className="flex justify-center grow items-end">
                <button
                className="border-2 p-1 rounded-xl w-40 text-center cursor-pointer font-bold text-xl
                border-slate-600 text-slate-600
                hover:border-[#006D77] hover:text-[#006D77]
                "
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
    )
}