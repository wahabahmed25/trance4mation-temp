import { Timestamp } from "firebase/firestore";
import { RoomData } from "../types/RoomData";
import Participant from "./Participant";
import Speaker from "./Speaker";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ParticipantData } from "../types/ParticipantData";

interface CircleProps {
  roomData: RoomData;
  onStartButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

const radius = 120

export default function Circle({ roomData, onStartButtonClick }: CircleProps) {
  const [participants, setParticipants] = useState<ParticipantData[]>(roomData.participants)
  const [timeLeft, setTimeLeft] = useState<number>(0);  // The time to display underneath the speaker
  const [refreshFlag, setRefreshFlag] = useState<boolean>(true)
  const previousRoom = useRef<string>(undefined)        // room id of previous room. used to detect room change
  const speaker = roomData.isActive                     // The current speaker
    ? roomData.participants[roomData.speakerIndex]
    : undefined;

  // When time related variables change, update timeLeft accordingly
  useEffect(() => {
    if (!roomData.isActive) {
      return;
    }

    // The time elapsed is the difference in seconds between now and when the speaker current speaker was selected
    const timeElapsed = Timestamp.now().seconds - roomData.speakerStart.seconds;
    setTimeLeft(Math.max(0, roomData?.timeLimit - timeElapsed))

    // set up a timer that periodically updates timeLeft based on how much time has passed since speakerStart
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
  }, [roomData.isActive, roomData.speakerStart?.seconds, roomData.timeLimit]);

  // update the displayed participants when roomData changes
  useEffect(() => {
    // when the room changes, do a "refresh" of the participants to play the entrance animations properly
    if (previousRoom.current !== roomData.id) {
      setParticipants([])
      setRefreshFlag(true)
      previousRoom.current = roomData.id
    }
    // if the room is the same, then just update participants without replaying the entrance animation
    else {
      setParticipants(roomData.participants)
    }

    // if the refresh flag is raised, update participants
    if (refreshFlag) {
      setParticipants(roomData.participants)
      setRefreshFlag(false)
    }
  }, [participants.length, refreshFlag, roomData.id, roomData.participants])

  return (
    <div className="grow flex justify-center items-center">
      {participants.map((participant, index) => {
        const baseAngle = (2 * Math.PI) / participants.length;
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
            startTime={roomData.speakerStart}
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
