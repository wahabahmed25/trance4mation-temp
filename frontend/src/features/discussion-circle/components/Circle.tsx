import { useState } from "react";
import { UserData } from "../types/UserData";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const placeholder: UserData[] = [
    {name: "Jerry", icon: "/globe.svg", id: "kjad"},
    {name: "Jane", icon: "/mask-solid-full.svg", id: "hjav"},
    {name: "John", icon: "/next.svg", id: "awss"},
    {name: "Jack", icon: "/window.svg", id: "asd"},
    {name: "Jill", icon: "/vercel.svg", id: "yhhvf"},
    {name: "Jelly", icon: "/user-regular-full.svg", id: "iiaeb"}
]

export default function Circle({users = placeholder, timeLimit, timeLeft}: {users?: UserData[], timeLimit: number, timeLeft: number}) {
    const [speaker, setSpeaker] = useState<UserData>(users[0])
    const [radius, setRadius] = useState<number>(120)
    const user = useAuth()
    
    return (
        <div className="grow flex justify-center items-center">
            {placeholder.map((user, index) => {
                const baseAngle = 2 * Math.PI / users.length
                const angle = baseAngle * index
                const xTranslate = radius * Math.cos(angle)
                const yTranslate = radius * Math.sin(angle)
                const isSpeaker = user.id === speaker.id

                return(
                    <div key={user.name} className="absolute" style={{
                        transform: `translate(${xTranslate}px, ${yTranslate}px)`
                    }}>
                        <div className="border-3 rounded-full" style={{borderColor: isSpeaker ? "#FFD166" : "#066D77"}}>
                            <div className="size-16 p-2 rounded-full bg-slate-700">
                                <div className="size-12 relative">
                                    <Image
                                    src={user.icon}
                                    alt={user.icon}
                                    fill={true}
                                    priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            )}

            <div className="absolute">
                <div className="border-3 rounded-full ">
                    <div className="size-20 p-2 rounded-full bg-slate-700">
                        {speaker ? 
                            <div className="relative flex justify-center items-end">
                                <div className="size-16 relative flex items-center justify-center">
                                    <svg className="size-24 absolute -rotate-90">
                                        <circle 
                                        cx="50%" cy="50%" r="40px" 
                                        fill="none" stroke="#FFD166" 
                                        strokeWidth={3} strokeDasharray={2 * 40 * Math.PI} strokeDashoffset={2 * 40 * Math.PI * (1 - timeLeft / timeLimit)}
                                        />
                                    </svg>
                                    <Image
                                    src={speaker.icon}
                                    alt={speaker.icon}
                                    fill={true}
                                    priority
                                    className="z-0"
                                    />
                                </div>
                                <div className="text-white text-xl font-semibold z-1 absolute rounded-full -bottom-10">
                                    <p>{timeLeft}</p>
                                </div>
                            </div>
                        : 
                            <Image
                            src={user.user?.profilePic ?? ""}
                            alt={user.user?.name ?? ""}
                            fill={true}
                            priority
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
    
}