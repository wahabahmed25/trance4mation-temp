import { useState } from "react";
import { UserData } from "../types/UserData";
import Image from "next/image";

const placeholder: UserData[] = [
    {name: "Jerry", icon: "/globe.svg", id: "kjad"},
    {name: "Jane", icon: "/mask-solid-full.svg", id: "hjav"},
    {name: "John", icon: "/next.svg", id: "awss"},
    {name: "Jack", icon: "/window.svg", id: "asd"},
    {name: "Jill", icon: "/vercel.svg", id: "yhhvf"},
    {name: "Jelly", icon: "/user-regular-full.svg", id: "iiaeb"}
]

export default function Circle({users = placeholder}: {users?: UserData[]}) {
    const [speaker, setSpeaker] = useState<UserData>(users[0])
    const [radius, setRadius] = useState<number>(120)
    
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
                <div className="border-3 rounded-full border-[#FFD166]">
                    <div className="size-20 p-2 rounded-full bg-slate-700">
                        <div className="size-16 relative">
                            <Image
                            src={speaker.icon}
                            alt={speaker.icon}
                            fill={true}
                            priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}