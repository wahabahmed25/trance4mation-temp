import { Timestamp } from "firebase/firestore";
import { JSX, useEffect, useRef, useState } from "react";
import { ReactionData } from "../types/ReactionData";
import { REACTIONS } from "@/app/discussion-circle/constants";
import { motion } from "framer-motion";

let id = 0;

export default function ReactionSpawner({
  reactionData,
}: {
  reactionData: ReactionData | undefined;
}) {
  const [previousReaction, setPreviousReaction] = useState<
    ReactionData | undefined
  >(undefined);
  const [children, setChildren] = useState<JSX.Element[]>([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!reactionData || !ref.current) {
      return;
    }

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
