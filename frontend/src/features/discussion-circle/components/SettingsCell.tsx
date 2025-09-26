import Image from "next/image"
import { DiscussionCircleSetting } from "../types/DiscussionCircleSetting"

export default function SettingsCell({setting}: {setting: DiscussionCircleSetting}) {
    return(
        <div className="flex gap-2 border-1 rounded-sm p-2">
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
            />
        </div>
    )
}