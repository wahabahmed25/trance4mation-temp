import { POPPINS_BOLD, ROOM_CREATION_SETTINGS } from "@/app/discussion-circle/defaults";
import SettingsCell from "./SettingsCell";

export default function SettingsGrid({onChange} : {onChange: (label: string, value: unknown) => void}) {
    return (
        <div className="flex flex-col gap-2">
            <div className={`${POPPINS_BOLD.className}`}>
                Settings
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {ROOM_CREATION_SETTINGS.map((setting) => <SettingsCell key={setting.field} setting={setting} onChange={onChange}/>)}
            </div>
        </div>
    )
}