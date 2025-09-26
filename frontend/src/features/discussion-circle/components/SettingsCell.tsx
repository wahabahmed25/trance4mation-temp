import Image from "next/image"
import { DiscussionCircleSetting } from "../types/DiscussionCircleSetting"
import { RED } from "@/app/discussion-circle/defaults"

export default function SettingsCell({setting, onChange}: {setting: DiscussionCircleSetting, onChange: (label: string, value: unknown) => void}) {
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
            placeholder="5"
            onChange={(event) => {onChange(setting.label, event.target.value)}}
            />
        </div>
    )
}