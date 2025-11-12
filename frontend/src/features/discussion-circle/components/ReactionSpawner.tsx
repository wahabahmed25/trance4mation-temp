import { Timestamp } from "firebase/firestore";
import { JSX, useEffect, useRef, useState } from "react";
import { ReactionData } from "../types/ReactionData";
import { REACTIONS } from "@/app/discussion-circle/constants";
import { motion } from "framer-motion";

let id = 0; // used to provide a unique key to each emoji that floats up the screen

interface ReactionSpawnerProps {
  reactionData: ReactionData | undefined; // the most recent reaction on the server
}

export default function ReactionSpawner({reactionData}: ReactionSpawnerProps) {
  const [previousReaction, setPreviousReaction] = useState<     // the most recent reaction displayed on the client
    ReactionData | undefined
  >(undefined);
  const [children, setChildren] = useState<JSX.Element[]>([]);  // an array of floating emoji elements
  const [height, setHeight] = useState(0);                      // height of this component
  const [width, setWidth] = useState(0);                        // width of this component
  const ref = useRef<HTMLDivElement>(null);                     // reference to the topmost div of this component. Used to dynamically update height and width

  // after rendering, grab the width and height of this component and set the corresponding state variables
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const subject = ref.current;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });
    observer.observe(subject);

    return () => {
      observer.unobserve(subject);
    };
  }, []);

  // if the latest reaction on the server differs from the latest reaction on the client, add a floating emoji
  useEffect(() => {
    if (!reactionData || !ref.current) {
      return;
    }

    // if the latest reaction on the server was sent more than 5 seconds ago, ignore it
    if (Timestamp.now().seconds - reactionData.timestamp.seconds > 5) {
      return;
    }

    if (reactionData.timestamp !== previousReaction?.timestamp) {
      setPreviousReaction(reactionData);
      const reaction = REACTIONS[reactionData.reactionIndex];
      console.log(reaction);

      if (ref.current === null) {
        return;
      }

      const newChild = (
        <motion.div
          key={id}
          className="absolute text-3xl"
          initial={{
            opacity: 1,
            y: height - 32,
            x: Math.random() * (width ? width - 32 : 0),
          }}
          whileInView={{ opacity: 0, y: 0 }}
          transition={{ duration: 5 }}
        >
          {REACTIONS[reactionData.reactionIndex] ?? ""}
        </motion.div>
      );
      id += 1;

      setChildren((children) => {
        return [...children, newChild];
      });
    }
  }, [reactionData, previousReaction, height, width]);

  return (
    <div ref={ref} className="w-full h-full grow relative">
      {children}
    </div>
  );
}
