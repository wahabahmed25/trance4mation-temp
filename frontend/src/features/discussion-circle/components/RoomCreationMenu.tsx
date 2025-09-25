import { POPPINS_BOLD, YELLOW, defaultMessages, defaultPeople } from "@/app/discussion-circle/defaults";
import { RoomData } from "../types/RoomData";
import Carousel from "./Carousel";
import ChatLog from "./ChatLog";
import Navbar from "./Navbar";
import TextInput from "./TextInput";
import Image from "next/image";

export default function RoomCreationMenu() {
    return (
        <div className="flex flex-col w-3/4 grow" style={{backgroundColor: YELLOW}}>
            <div className="flex gap-6 p-6 items-start">
                <div className="rounded-full size-24 border-1 shrink-0 flex justify-center items-center">
                    <Image 
                    src={"/vercel.svg"}
                    alt="Sidebar"
                    width={90}
                    height={90}
                    priority
                    />
                </div>
                <div className="flex flex-col grow shrink gap-2 min-w-0">
                    <TextInput
                    placeholder="Room Name"
                    className={POPPINS_BOLD.className}
                    />
                    <textarea 
                    className="border-1 rounded-sm p-2 grow text-base"
                    placeholder="Description"
                    style={{
                        resize: "none",
                    }}
                    >
                        
                    </textarea>
                </div>
            </div>
        </div>
    )
}