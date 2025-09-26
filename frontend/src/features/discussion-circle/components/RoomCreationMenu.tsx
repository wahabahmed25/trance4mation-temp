import { DEFAULT_ROOM_SETTINGS, POPPINS_BOLD, PURPLE, YELLOW} from "@/app/discussion-circle/defaults";
import TextInput from "./TextInput";
import Image from "next/image";
import SettingsGrid from "./SettingsGrid";
import Navbar from "./Navbar";
import { MouseEventHandler, useState } from "react";
import { RoomSettings } from "../types/RoomSettings";

interface RoomCreationMenuProps {
    onCloseButtonClick?: MouseEventHandler<HTMLImageElement>,
    onConfirmButtonClick?: (settings: RoomSettings) => void 
}

export default function RoomCreationMenu({onCloseButtonClick, onConfirmButtonClick}: RoomCreationMenuProps) {
    const [settings, setSettings] = useState(DEFAULT_ROOM_SETTINGS)

    function changeSetting(setting: string, value: unknown) {
        setSettings({
            ...settings,
            [setting]: value
        })
    }

    return (
        <div className="flex flex-col w-3/4 grow" style={{backgroundColor: YELLOW}}>
            <Navbar 
            header="Room Creation"
            rightSideButtons={[{
                icon: "/xmark-solid-full.svg",
                onClick: onCloseButtonClick
            }]}
            />
            <div className="flex flex-col p-6 gap-2">
                <div className="flex gap-6 items-start">
                    <div className="rounded-full size-24 border-1 shrink-0 flex justify-center items-center">
                        <Image 
                        src={"/vercel.svg"}
                        alt="Sidebar"
                        width={90}
                        height={90}
                        priority
                        />
                    </div>
                    <div className="flex flex-col grow shrink gap-2 min-w-0">
                        <TextInput
                        placeholder="Room Name"
                        className={POPPINS_BOLD.className}
                        onChange={(event) => changeSetting("name", event.target.value)}
                        />
                        <textarea 
                        className="border-1 rounded-sm p-2 grow text-base"
                        placeholder="Description"
                        style={{
                            resize: "none",
                        }}
                        onChange={(event) => changeSetting("description", event.target.value)}
                        >
                            
                        </textarea>
                    </div>
                </div>
                <SettingsGrid onChange={changeSetting}/>
            </div>
            <div className="flex justify-center grow items-end p-6">
                <button
                className="border-1 p-2 rounded-sm w-40 text-center"
                style={{
                    backgroundColor: PURPLE,
                    cursor: "pointer"
                }}
                onClick={() => onConfirmButtonClick ? onConfirmButtonClick(settings) : {}}
                >
                    Create and Join
                </button>
            </div>
        </div>
    )
}