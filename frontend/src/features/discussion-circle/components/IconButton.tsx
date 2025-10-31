import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  imageSrc: string | StaticImport;
  imageSize: number;
  buttonSize: number;
}

export default function IconButton({
  onClick,
  imageSrc,
  imageSize,
  buttonSize,
}: IconButtonProps) {
  return (
    <div
      className="
        shrink-0 
        hover:bg-[#FCA17D]/60
        flex items-center justify-center rounded-md
      "
      style={{
        width: `calc(var(--spacing) * ${buttonSize})`,
        height: `calc(var(--spacing) * ${buttonSize})`,
      }}
    >
      <button
        className="relative"
        onClick={onClick}
        style={{
          width: `calc(var(--spacing) * ${imageSize})`,
          height: `calc(var(--spacing) * ${imageSize})`,
        }}
      >
        <Image
          src={imageSrc}
          alt={typeof imageSrc === "string" ? imageSrc : ""}
          fill={true}
          style={{ filter: "opacity(0.8)" }}
        />
      </button>
    </div>
  );
}
