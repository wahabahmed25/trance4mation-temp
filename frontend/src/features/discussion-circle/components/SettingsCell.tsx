import Image from "next/image"
import { RED } from "@/app/discussion-circle/defaults"
import { RoomSetting } from "../types/RoomSetting"
import { useState } from "react"

interface SettingsCellProps {
    setting: RoomSetting,
    onChange: (field: string, value: string | number | boolean | undefined) => void,
}

export default function SettingsCell({setting, onChange}: SettingsCellProps) {
    const [value, setValue] = useState<string | number | boolean | undefined>(setting.defaultValue)

    // console.log(setting.defaultValue)

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
            value={typeof(value) === "boolean" ? undefined : value}
            checked={typeof(value) === "boolean" ? value : undefined}
            step={setting.step ?? 1}
            onChange={(event) => {
                if (setting.type == "checkbox") {
                    onChange(setting.field, event.target.checked)
                }
                else if (setting.type === "number") {
                    onChange(setting.field, parseFloat(event.target.value))
                }
                setValue(event.target.value)
            }}
            />
        </div>
    )
}