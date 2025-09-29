import Image from "next/image"
import { DiscussionCircleSetting } from "../types/DiscussionCircleSetting"
import { RED } from "@/app/discussion-circle/defaults"
import { RoomSetting } from "../types/RoomSetting"
import { useState } from "react"

interface SettingsCellProps {
    setting: RoomSetting,
    onChange: (label: string, value: string | number | readonly string[] | undefined) => void,
}

export default function SettingsCell({setting, onChange}: SettingsCellProps) {
    const [value, setValue] = useState<string | number | readonly string[] | undefined>(setting.defaultValue)

    return(
        <div 
        className="flex gap-2 border-1 rounded-sm p-2"
        style={{
            backgroundColor: RED
        }}
        >
            <Image 
            className="grow-0"
            src={setting.image}
            alt={setting.label}
            width={20}
            height={20}
            priority
            />

            <div 
            className="w-24 grow-1"
            >
                {setting.label}
            </div>

            <input
            className="w-12 grow-0"
            type={setting.type}
            value={value}
            onChange={(event) => {
                setValue(event.target.value)
                onChange(setting.label, event.target.value)
            }}
            />
        </div>
    )
}