import { DEFAULT_ROOM_DATA, POPPINS_BOLD, ROOM_CREATION_SETTINGS } from "@/app/discussion-circle/defaults";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { RoomData } from "../types/RoomData";
import { Input, Textarea } from "@headlessui/react";
import SettingsCell from "./SettingsCell";

interface RoomCreationMenuProps {
    onCloseButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onConfirmButtonClick?: (roomData: Omit<RoomData, "id">) => void 
}

export default function RoomCreationMenu({onCloseButtonClick, onConfirmButtonClick}: RoomCreationMenuProps) {
    const [settings, setSettings] = useState<Omit<RoomData, "id">>(DEFAULT_ROOM_DATA)

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
                className={`${POPPINS_BOLD.className} text-white text-base p-1 px-2 border-b-2 border-slate-600`}
                onChange={(event) => changeSetting("name", event.target.value)}
                />
                
                <Textarea 
                className="border-2 rounded-sm p-2 grow text-base bg-slate-900 text-white border-slate-600"
                placeholder="Description"
                style={{
                    resize: "none",
                }}
                onChange={(event) => changeSetting("description", event.target.value)}
                />
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ROOM_CREATION_SETTINGS.map((setting) => <SettingsCell key={setting.field} setting={setting} onChange={changeSetting}/>)}
            </div>
            


            <div className="flex justify-center grow items-end">
                <button
                className="border-3 p-1 rounded-full w-40 text-center cursor-pointer font-bold text-xl
                border-slate-600 text-slate-600
                hover:border-[#006D77] hover:text-[#006D77]
                "
                onClick={() => onConfirmButtonClick ? onConfirmButtonClick(settings) : {}}
                >
                    Create
                </button>
            </div>
        </div>
    )
}