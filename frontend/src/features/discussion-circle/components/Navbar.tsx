import { RED, POPPINS_BOLD } from "@/app/discussion-circle/defaults"
import ImageButton from "./ImageButton"
import { MouseEventHandler } from "react"

interface NavbarProps {
    roomName?: string,
    onMenuButtonClick?: MouseEventHandler<HTMLImageElement> | undefined,
    onExitButtonClick?: MouseEventHandler<HTMLImageElement> | undefined
}

export default function Navbar({roomName = "Room Name", onMenuButtonClick, onExitButtonClick}: NavbarProps) {
    return (
        <div 
        style={{
            backgroundColor: RED,
            position: "relative",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ImageButton 
            src={"/chevron-right-regular-full.svg"}
            style={{
                position: "absolute",
                left: 0
            }}
            onClick={onMenuButtonClick}
            />

            <div className="flex justify-center" style={{width: 0}}>
                <div className={POPPINS_BOLD.className} style={{minWidth: "60vw", textAlign: "center"}}>
                    {roomName}
                </div>
            </div>
            
            <ImageButton
            src={"/right-from-bracket-regular-full.svg"}
            style={{
                position: "absolute",
                right: 0
            }}
            onClick={onExitButtonClick}
            />
        </div>
    )
}