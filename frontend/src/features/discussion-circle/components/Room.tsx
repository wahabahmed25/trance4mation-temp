import { YELLOW, defaultMessages, defaultPeople } from "@/app/discussion-circle/defaults";
import { RoomData } from "../types/RoomData";
import Carousel from "./Carousel";
import ChatLog from "./ChatLog";
import Navbar from "./Navbar";
import TextInput from "./TextInput";

export default function Room(roomData: RoomData) {
    <div className="flex flex-col w-3/4 grow" style={{backgroundColor: YELLOW}}>
        <Navbar/>
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
}