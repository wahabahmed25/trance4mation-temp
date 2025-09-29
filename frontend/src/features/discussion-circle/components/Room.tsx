import { YELLOW, defaultMessages, defaultPeople } from "@/app/discussion-circle/defaults";
import Carousel from "./Carousel";
import ChatLog from "./ChatLog";
import Navbar from "./Navbar";
import TextInput from "./TextInput";
import { MouseEventHandler } from "react";

interface RoomProps {
    roomCode: string,
    onMenuButtonClick?: MouseEventHandler<HTMLImageElement>,
    onExitButtonClick?: MouseEventHandler<HTMLImageElement>
}

export default function Room({roomCode, onMenuButtonClick, onExitButtonClick} : RoomProps) {
    return (
        <div className="flex flex-col w-3/4 grow" style={{backgroundColor: YELLOW}}>
            <Navbar 
            header={roomCode}
            leftSideButtons={[{
                icon: "chevron-right-regular-full.svg",
                onClick: onMenuButtonClick
            }]}
            rightSideButtons={[{
                icon: "right-from-bracket-regular-full.svg",
                onClick: onExitButtonClick
            }]}
            />
            <div className="flex flex-col p-2 grow justify-end gap-2">
                <ChatLog messages={defaultMessages}/>
                <TextInput placeholder="Message"/>
                <div style={{
                    height: "80px",
                    marginTop: "50px"
                }}>
                    <Carousel users={defaultPeople}/>
                </div>
            </div>
        </div>
    )
}