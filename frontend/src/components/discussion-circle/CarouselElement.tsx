type CarouselElementProps = {
    children: React.ReactNode, 
    zIndex: number, 
    rotateY: number, 
    translateZ: number, 
    translateYPercent: number
}

export function CarouselElement({children, zIndex, rotateY, translateZ, translateYPercent}: CarouselElementProps) {
    return (
        <div style={{
            transformStyle: "preserve-3d",
            zIndex: zIndex
        }}>  
            <div style={{
                position: "absolute",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
                transform: `translate(-50%, ${translateYPercent}%)`
            }}>
                <div style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotateY}deg)`
                }}>
                        
                    <div style={{
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${translateZ}px)`
                    }}>
                        <div style={{
                            transformStyle: "preserve-3d",
                            transform: `rotateY(${-rotateY}deg)`
                        }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}