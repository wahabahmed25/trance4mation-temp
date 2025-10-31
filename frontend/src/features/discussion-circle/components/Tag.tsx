import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface TagProps {
  imageSrc: string | StaticImport;
  text: string;
}

export default function Tag({ imageSrc, text }: TagProps) {
  return (
    <div
      className="
				pl-2 pr-3 py-0.5 flex items-center 
        rounded-full border border-[#000]/10 bg-white/40
        text-black/80
      "
    >
      <Image
        src={imageSrc}
        alt={typeof imageSrc === "string" ? imageSrc : ""}
        width={20}
        height={20}
        priority
        style={{ filter: "opacity(0.8)" }}
      />
      {text}
    </div>
  );
}
