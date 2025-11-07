import { Timestamp } from "firebase/firestore";
import { RoomData } from "../types/RoomData";
import Participant from "./Participant";
import Speaker from "./Speaker";
import { MouseEventHandler, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CircleProps {
  roomData: RoomData;
  onStartButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

const radius = 120

export default function Circle({ roomData, onStartButtonClick }: CircleProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const speaker = roomData.isActive
    ? roomData.participants[roomData.speakerIndex]
    : undefined;

  useEffect(() => {
    if (!roomData.isActive) {
      return;
    }

    const timerId = setInterval(() => {
      const timeElapsed = Timestamp.now().seconds - roomData.speakerStart.seconds;
      setTimeLeft(Math.max(0, roomData?.timeLimit - timeElapsed));

      if (timeElapsed >= roomData?.timeLimit) {
        clearInterval(timerId);
      }
    });

    return () => {
      clearInterval(timerId);
    };
  }, [roomData.speakerStart, roomData.timeLimit, roomData.isActive]);

  return (
    <div className="grow flex justify-center items-center">
      {roomData.participants.map((participant, index) => {
        const baseAngle = (2 * Math.PI) / roomData.participants.length;
        const angle = baseAngle * index - Math.PI / 2;
        const xTranslate = radius * Math.cos(angle);
        const yTranslate = radius * Math.sin(angle);
        const isSpeaker = participant.uid === speaker?.uid;

        return (
          <motion.div
          key={participant.uid}
          initial={{x: 0, y: 0}}
          whileInView={{ x: xTranslate, y: yTranslate }}
          transition={{ duration: 0.4 }}
          className="absolute"
          >
            <Participant
              key={participant.uid}
              userData={participant}
              isSpeaker={isSpeaker}
            />
          </motion.div>
        );
      })}

      {roomData.isActive ? (
        <div className="absolute">
          <Speaker
            userData={speaker}
            timeLeft={timeLeft}
            timeLimit={roomData.timeLimit}
          />
        </div>
      ) : (
        <button
          className="flex absolute text-6xl items-center justify-center cursor-pointer"
          onClick={onStartButtonClick}
        >
          ▶️
        </button>
      )}
    </div>
  );
}
