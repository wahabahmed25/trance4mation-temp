import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { collection, doc, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { RoomData } from "../types/RoomData";
import { MessageData } from "../types/MessageData";
import Image from "next/image";
import { Textarea } from "@headlessui/react";
import Circle from "./Circle";

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
    onMenuButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onExitButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onSendMessageButtonClick?: (message: string) => void
}

export default function Room({roomData, onExitButtonClick, onSendMessageButtonClick} : RoomProps) {
    const [timeLimit, setTimeLimit] = useState(0)
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [isPromptVisible, setPromptVisible] = useState<boolean>(true)
    const speakerStartTime = useRef<number>(undefined)
    const timer = useRef<NodeJS.Timeout>(undefined)
    
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, "rooms", roomData.id), (doc) => {
            const data = doc.data()
            // set the time limit state variable for use in rendering the clock
            setTimeLimit(data?.timeLimit)

            // set the start time ref variable. not used for rendering
            speakerStartTime.current = data?.speakerStart.seconds
            // this interval uses the values of timeLimit and speakerStart grabbed when the interval was started
            // it does not update when the state variables update, only when the fields in Firebase update 
            const timerId = setInterval(() => {
                if (!speakerStartTime.current) {
                    return
                }
                const timeElapsed = Timestamp.now().seconds - speakerStartTime.current
                setTimeLeft(data?.timeLimit - timeElapsed)

                if (timeElapsed === data?.timeLimit) {
                    clearInterval(timerId)
                }
            })
            timer.current = timerId
        })

        return () => {
            unsubscribe()
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    },[roomData.id])
    
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
                            I wonder how, I wonder why. Yesterday you told me about the blue, blue sky, 
                            but all that I can see, is just a yellow lemon tree. I&apos;m turning my head. Up and down.
                            Turning, turning, turning, turning around
                        </p>
                    : <></>
                    }
                </div>
            </div>

            <Circle
            // users={}
            timeLimit={timeLimit}
            timeLeft={timeLeft}
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
