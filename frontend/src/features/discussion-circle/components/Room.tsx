import { YELLOW, defaultMessages, defaultPeople } from "@/app/discussion-circle/defaults";
import Carousel from "./Carousel";
import ChatLog from "./ChatLog";
import Navbar from "./Navbar";
import TextInput from "./TextInput";
import { FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { RoomData } from "../types/RoomData";
import { MessageData } from "../types/MessageData";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

interface RoomProps {
    roomData: RoomData,
    onMenuButtonClick?: MouseEventHandler<HTMLImageElement>,
    onExitButtonClick?: MouseEventHandler<HTMLImageElement>,
    onSendMessageButtonClick?: (message: string) => void
}

export default function Room({roomData, onMenuButtonClick, onExitButtonClick, onSendMessageButtonClick} : RoomProps) {
    const [messages, setMessages] = useState<MessageData[]>([])
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "rooms", roomData.id, "messages"), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // Message added
                    setMessages((prev) => {
                        const added = {
                            text: change.doc.data().text,
                            id: change.doc.id,
                            sender: change.doc.data().sender
                        }
                        return prev.concat([added])
                    })
                }
                if (change.type === "modified") {
                    // Message modified
                }
                if (change.type === "removed") {
                    // Message removed
                }
            })
        })

        return unsubscribe
    },[])
    
    return (
        <div className={"w-screen h-screen bg-[#FFD166] flex flex-col"}>
            <Navbar 
            header={roomData.name}
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
                <ChatLog messages={messages}/>
                <TextInput placeholder="Message" onSend={onSendMessageButtonClick}/>
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
