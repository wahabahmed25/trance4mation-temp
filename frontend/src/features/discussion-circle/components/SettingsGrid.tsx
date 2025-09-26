import { POPPINS_BOLD, DISCUSSION_CIRCLE_SETTINGS } from "@/app/discussion-circle/defaults";
import SettingsCell from "./SettingsCell";

export default function SettingsGrid() {
    return (
        <div>
            <div className={`${POPPINS_BOLD.className}`}>
                Settings
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {DISCUSSION_CIRCLE_SETTINGS.map((setting) => <SettingsCell key={setting.label} setting={setting}/>)}
            </div>
        </div>
    )
}