import { RED, POPPINS_BOLD } from "@/app/discussion-circle/defaults"
import ImageButton from "./ImageButton"
import { MouseEventHandler } from "react"

interface NavbarProps {
    header?: string,
    leftSideButtons?: Array<{
        icon: string,
        onClick: MouseEventHandler<HTMLImageElement> | undefined
    }>
    rightSideButtons?: Array<{
        icon: string,
        onClick: MouseEventHandler<HTMLImageElement> | undefined
    }>
}

export default function Navbar({header = "Header", leftSideButtons, rightSideButtons}: NavbarProps) {
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
            <div className="flex" style={{
                position: "absolute",
                left: 0
            }}>
                {leftSideButtons?.map((button) => {
                    return(
                        <ImageButton 
                        key={button.icon}
                        src={button.icon}
                        onClick={button.onClick}
                        />
                    )
                })}
            </div>

            <div className="flex justify-center" style={{width: 0}}>
                <div className={POPPINS_BOLD.className} style={{minWidth: "60vw", textAlign: "center"}}>
                    {header}
                </div>
            </div>
            
            <div className="flex" style={{
                position: "absolute",
                right: 0
            }}>
                {rightSideButtons?.map((button) => {
                    return(
                        <ImageButton 
                        key={button.icon}
                        src={button.icon}
                        onClick={button.onClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}