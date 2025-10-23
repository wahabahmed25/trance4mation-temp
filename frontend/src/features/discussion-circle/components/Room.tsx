import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { RoomData } from "../types/RoomData";
import Image from "next/image";
import Circle from "./Circle";
import IconButton from "./IconButton";

interface RoomProps {
    roomData: RoomData,
    onExitButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onStartButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Room({roomData, onExitButtonClick, onStartButtonClick} : RoomProps) {
    const [isPromptVisible, setPromptVisible] = useState<boolean>(true)
    
    return (
        <div className="flex flex-col grow h-full gap-2">
            <div className="flex items-center">
                <h1 className="text-[#FCA17D] font-bold text-3xl grow">
                    {roomData.name}
                </h1>
                {/* Exit Button */}
                <IconButton
                onClick={onExitButtonClick}
                imageSrc={"/right-from-bracket-regular-full.svg"}
                imageSize={8}
                buttonSize={10}
                />
            </div>

            <div className="relative z-1">
                <div className="absolute flex bg-neutral-900 border-2 border-slate-800 rounded-md flex-col p-2">
                    {/* Toggle Prompt */}
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
            roomData={roomData}
            onStartButtonClick={onStartButtonClick}
            />

            <div className="flex flex-col gap-2 relative">
                <div className="flex text-3xl justify-center absolute w-full"
                style={{
                    top: "-1.5em"
                }}
                >
                    {roomData.isActive ?
                        <>
                            <button>👍</button>
                            <button>❤️</button>
                            <button>👏</button>
                            <button>😂</button>
                            <button>😮</button>
                        </>
                    :   <div className="grow rounded-lg p-2
                        border border-white/10 bg-white/5 
                        text-gray-200 placeholder-gray-500 text-base
                        flex justify-between">
                            <p>{roomData.url ?? "url goes here"}</p>
                            <button className="cursor-pointer">
                                🔗
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
