import { useEffect, useRef, useState } from "react";
import { UserData } from "../types/UserData";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";

interface ParticipantProps {
  userData: UserData | undefined;
  timeLimit: number;
  timeLeft: number;
  startTime: Timestamp
}

export default function Speaker({
  userData,
  timeLimit,
  timeLeft,
  startTime
}: ParticipantProps) {
  const previousStartTime = useRef<Timestamp | undefined>(undefined)  // the most recent start time on the client
  const [progress, setProgress] = useState<number>(0)                 // how much of the timer is ticked down. 0 means the timer is full. 1 means it's empty
  const [transitionTime, setTransitionTime] = useState<number>(0)     // how long it takes in seconds for the timer to reach the given progress

  useEffect(() => {
    // if the start time on the server suddenly changes (which it shouldn't in a normal game), reset the timer
    if (startTime.seconds != previousStartTime.current?.seconds) {
      console.log("reset timer", "previous:", previousStartTime.current?.toDate(), "current:", startTime.toDate())
      setTransitionTime(0)
      setProgress(0)
      previousStartTime.current = startTime
      return
    }

    // after a timer reset, start the timer again
    if (transitionTime === 0) {
      setProgress(1)
      setTransitionTime(timeLimit)
    }
  }, [startTime, transitionTime, timeLimit])

  return (
    <div className="size-20 p-2 rounded-full bg-slate-700">
      <div className="relative flex justify-center items-end">
        <div className="size-16 relative flex items-center justify-center">
          <svg className="size-24 absolute -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="40px"
              fill="none"
              stroke="#FCA17D"
              strokeWidth={3}
              strokeDasharray={2 * 40 * Math.PI}
              strokeDashoffset={2 * 40 * Math.PI * progress}
              style={{ transition: `stroke-dashoffset ${transitionTime}s linear` }}
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
  );
}
