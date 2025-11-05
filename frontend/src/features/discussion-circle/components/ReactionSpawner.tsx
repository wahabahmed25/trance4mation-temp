import { Timestamp } from "firebase/firestore";
import { JSX, useEffect, useRef, useState } from "react";
import { ReactionData } from "../types/ReactionData";
import { REACTIONS } from "@/app/discussion-circle/constants";
import { motion } from "framer-motion";
import { redirect } from "next/dist/server/api-utils";

let id = 0

export default function ReactionSpawner({reactionData}: {reactionData: ReactionData | undefined}) {
    const [previousReaction, setPreviousReaction] = useState<ReactionData | undefined>(undefined)
    const [children, setChildren] = useState<JSX.Element[]>([])
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) {
            return
        }
        setHeight(ref.current.clientHeight)
        setWidth(ref.current.clientWidth)
    }, [ref.current?.clientHeight, ref.current?.clientWidth])

    useEffect(() => {
        if (!reactionData || !ref.current) {
            return
        }

        if (reactionData.timestamp !== previousReaction?.timestamp) {
            setPreviousReaction(reactionData)
            const reaction = REACTIONS[reactionData.reactionIndex]
            console.log(reaction)

            if (ref.current === null) {
                return
            }
            console.log("create floater", height, width)
            const newChild = (
                <motion.div
                key={id}
                className="absolute size-8 bg-blue-700"
                initial={{ opacity: 1, y: height - 32, x: Math.random() * (width ? width - 32 : 0) }}
                whileInView={{ opacity: 0, y: 0 }}
                transition={{ duration: 8 }}
                >
                    
                </motion.div>
            )
            id += 1

            setChildren((children) => {
                return [...children, newChild]
            })
        }
    }, [reactionData, previousReaction, height, width])

    return (
        <div ref={ref} className="w-full h-full grow relative">
            <div className="absolute size-4 bg-red-400" style={{
                transform: "translate(0px, 0px)"
            }}>
            </div>

            <div className="absolute size-8 bg-red-400" style={{
                transform: `translate(0px, ${height - 32}px)`
            }}>

            </div>
            {/* <div className="absolute left-8 size-4 bg-red-100">

            </div> */}
            {children}
        </div>
    )
}