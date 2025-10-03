import { ROOM_CREATION_SETTINGS } from "@/app/discussion-circle/defaults";
import SettingsCell from "./SettingsCell";

interface SettingsGridProps {
    onChange: (field: string, value: string | number | boolean | undefined) => void
}

export default function SettingsGrid({onChange} : SettingsGridProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {ROOM_CREATION_SETTINGS.map((setting) => <SettingsCell key={setting.field} setting={setting} onChange={onChange}/>)}
            </div>
        </div>
    )
}