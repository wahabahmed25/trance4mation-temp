import { CSSProperties, MouseEventHandler } from "react";
import Image from "next/image";

interface ImageButtonProps {
    onClick?: MouseEventHandler<HTMLImageElement> | undefined,
    src: string,
    alt?: string,
    width?: number, 
    height?: number,
    style?: CSSProperties
}

export default function ImageButton({onClick, src, alt = src, width = 30, height = 30, style = {}}: ImageButtonProps) {
    return (
        <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        style={{
            cursor: "pointer",
            ...style
        }}
        onClick={onClick}
        />
    )
}