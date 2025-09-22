import { User } from "@/features/discussion-circle/types/User"
import Person from "./Person"
import { CarouselElement } from "./CarouselElement"
import React from "react"

export default function Carousel({users, radius = 100}: {users: User[], radius?: number}) {        
    return (
        <div style={{
            perspective: "1000px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center"
        }}>
            {users.map((user, index) => {
                const zIndex = (index < users.length / 2) ? (-index) : -(users.length - index)
                const translateYPercent = (-150 / users.length) * -zIndex
                const rotateY = (360 / users.length) * index
                const translateZ = radius

                return (
                    <CarouselElement
                    zIndex={zIndex}
                    rotateY={rotateY}
                    translateZ={translateZ}
                    translateYPercent={translateYPercent}
                    key={user.id}
                    >
                        <Person person={user}/>
                    </CarouselElement>
                )
            })}
        </div>
    )
}