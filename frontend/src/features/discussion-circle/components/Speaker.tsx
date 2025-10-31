import { UserData } from "../types/UserData"
import Image from "next/image"

interface ParticipantProps {
    userData: UserData | undefined,
    timeLimit: number,
    timeLeft: number
}

export default function Speaker({userData, timeLimit, timeLeft}: ParticipantProps) {
    return (
        <div className="size-20 p-2 rounded-full bg-slate-700">
            <div className="relative flex justify-center items-end">
                <div className="size-16 relative flex items-center justify-center">
                    <svg className="size-24 absolute -rotate-90">
                        <circle 
                        cx="50%" cy="50%" r="40px" 
                        fill="none" stroke="#FCA17D" 
                        strokeWidth={3} strokeDasharray={2 * 40 * Math.PI} strokeDashoffset={2 * 40 * Math.PI * (1 - timeLeft / timeLimit)}
                        />
                    </svg>
                    <Image
                    src={userData?.icon ?? "/user-regular-full.svg"}
                    alt={"speaker"}
                    fill={true}
                    priority
                    className="z-0"
                    />
                </div>
                <div className="text-[#FCA17D] text-xl font-semibold absolute rounded-full -bottom-10">
                    <p>{timeLeft}</p>
                </div>
            </div>
        </div>
    )
}