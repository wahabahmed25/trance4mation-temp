import Image from "next/image";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Input, Textarea } from "@headlessui/react";
import SettingsCell from "./SettingsCell";
import { useAuth } from "@/context/AuthContext";
import { RoomSetting } from "../types/RoomSetting";
import { ClientRoomData } from "../types/ClientRoomData";
import IconButton from "./IconButton";
import { motion, useMotionValue } from "framer-motion";
import { createRoom } from "@/app/discussion-circle/api";

interface RoomCreationMenuProps {
    onCloseButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onConfirmButtonClick?: (roomData: ClientRoomData) => Promise<unknown>
    onRoomCreated?: () => void
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

export default function RoomCreationMenu({onCloseButtonClick, onConfirmButtonClick, onRoomCreated}: RoomCreationMenuProps) {
    const [settings, setSettings] = useState<ClientRoomData>(DEFAULT_SETTINGS)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [createButtonMessage, setCreateButtonMessage] = useState<string>("Create")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const user = useAuth()
    const updateMessage = useRef<NodeJS.Timeout>(undefined)

    function changeSetting(setting: string, value: string | number | boolean | undefined) {
        setSettings({
            ...settings,
            [setting]: value
        })
    }

    useEffect(() => {
        if (isLoading) {
            setCreateButtonMessage(".")
            setErrorMessage("")
            clearInterval(updateMessage.current)
            const intervalId = setInterval(() => {
                console.log("hi")
                setCreateButtonMessage((curr) => {
                    if (curr === ".") {return ".."}
                    if (curr === "..") {return "..."}
                    if (curr === "...") {return "."}
                    return "."
                })
            }, 500)
            updateMessage.current = intervalId
        }
        else {
            clearInterval(updateMessage.current)
            setCreateButtonMessage("Create")
        }
    }, [isLoading])

    return (
        <div 
        className="
        py-40 px-8 absolute z-2 w-screen h-screen 
        flex items-center justify-center 
        bg-slate-900/50
        ">
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                background: "linear-gradient(135deg, #FDE7D8 0%, #FFF7D8 100%)"
            }}
            className="
            flex flex-col p-8 gap-2 grow
            max-w-120 rounded-xl 
            shadow-[0_0_10px_rgba(255,111,97,0.4)]
            ">
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
                    {SETTINGS.map((setting) => <SettingsCell key={setting.field} setting={setting} onChange={changeSetting}/>)}
                </div>

                <div className="text-center text-red-600">
                    {errorMessage}
                </div>

                <div className="flex justify-center">
                    <motion.div
                    style={{background: "linear-gradient(135deg, #FCA17D 0%, #F6765E 100%)"}}
                    onClick={async () => {
                        if (isLoading) { return }
                        
                        setLoading(true)
                        await createRoom({...settings})
                        setLoading(false)
                        if (onRoomCreated) { onRoomCreated() }
                    }}
                    className="
                    p-1 w-40 cursor-pointer 
                    font-bold text-xl text-white text-center
                    shadow-[0_0_10px_rgba(255,111,97,0.4)] rounded-xl 
                    hover:scale-103 transition
                    ">
                    
                        {createButtonMessage}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}