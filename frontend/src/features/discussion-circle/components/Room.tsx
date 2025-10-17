import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getFirestore, onSnapshot, query, Timestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { RoomData } from "../types/RoomData";
import Image from "next/image";
import Circle from "./Circle";
import { useAuth } from "@/context/AuthContext";
import { UserData } from "../types/UserData";

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
    onExitButtonClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Room({roomData, onExitButtonClick} : RoomProps) {
    const [isPromptVisible, setPromptVisible] = useState<boolean>(true)
    
    return (
        <div className="flex flex-col grow h-full gap-2">
            <div className="flex items-center">
                <h1 className="text-white font-bold text-3xl grow">{roomData.name}</h1>
                <button className="relative size-8 shrink-0" onClick={onExitButtonClick}>
                    <Image 
                    src={"/right-from-bracket-regular-full.svg"}
                    alt="close"
                    fill={true}
                    style={{filter: "invert(1)"}}
                    />
                </button>
            </div>

            <div className="relative z-1">
                <div className="absolute flex bg-neutral-900 border-2 border-slate-800 rounded-md flex-col p-2">
                    <div className="flex justify-start" onClick={() => setPromptVisible((curr) => !curr)}>
                        <h1 className="text-gray-200 font-semibold text-md pb-1 cursor-pointer">Prompt:</h1>
                        <button className="relative size-6 cursor-pointer">
                            <Image 
                            src={"/chevron-down-solid-full.svg"}
                            alt="collapse"
                            fill={true}
                            style={{filter: "invert(1)"}}
                            />
                        </button>
                    </div>
                    {isPromptVisible ?
                        <p className="text-gray-200 font-semibold text-sm">
                            {roomData.prompt}
                        </p>
                    : <></>
                    }
                </div>
            </div>

            <Circle
            // speaker={speaker}
            // participants={participants}
            // timeLimit={timeLimit}
            // timeLeft={timeLeft}
            roomData={roomData}
            />

            <div className="flex flex-col gap-2 relative">
                <div className="flex text-3xl justify-center absolute w-full"
                style={{
                    top: "-1.5em"
                }}
                >
                    <button>👍</button>
                    <button>❤️</button>
                    <button>👏</button>
                    <button>😂</button>
                    <button>😮</button>
                </div>
            </div>
        </div>
    )
}
