import { User } from "@/types/User"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Person({person, timerOn = false, timerDuration = 10} : {person: User, timerOn?: boolean, timerDuration?: number}) {
    const strokeDashArray = 2 * Math.PI * 46
    const [strokeDashOffset, setStrokeDashOffset] = useState(timerOn ? strokeDashArray : 0)

    useEffect(() => {
        if (timerOn) {
            setStrokeDashOffset(0)
        }
        else {
            setStrokeDashOffset(2 * Math.PI * 46)
        }
    }, [timerOn])

    return (
        <div className="rounded-full bg-blue-500 size-16 place-content-center flex">
            <Image
            className="dark:invert"
            src={person.icon}
            alt="Next.js logo"
            width={40}
            height={40}
            priority
            />
            {timerOn 
            ?
                <svg 
                style={{
                    position: "absolute",
                    transition: `stroke-dashoffset ${timerDuration}s linear`,
                    transform: "rotateY(-180deg) rotateZ(-90deg)"
                }} 
                viewBox="0 0 100 100" 
                stroke="red" 
                fill="none" 
                strokeWidth={4}
                strokeDasharray={`${2 * Math.PI * 46}px`}
                strokeDashoffset={`${strokeDashOffset}px`}
                >
                    <circle r={46} cx={50} cy={50}/>
                </svg>
            :
                <></>
            }

        </div>
    )
}