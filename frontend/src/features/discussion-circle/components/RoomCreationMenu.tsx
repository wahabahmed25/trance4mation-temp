import { POPPINS_BOLD, YELLOW} from "@/app/discussion-circle/defaults";
import TextInput from "./TextInput";
import Image from "next/image";
import SettingsGrid from "./SettingsGrid";
import Navbar from "./Navbar";

export default function RoomCreationMenu() {
    return (
        <div className="flex flex-col w-3/4 grow" style={{backgroundColor: YELLOW}}>
            <Navbar 
            header="Room Creation"
            rightSideButtons={[{
                icon: "/xmark-solid-full.svg",
                onClick: () => {}
            }]}
            />
            <div className="flex flex-col p-6 gap-2">
                <div className="flex gap-6 items-start">
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
                <SettingsGrid/>
            </div>
        </div>
    )
}