"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCardProps {
  name: string;
  tags: string[];
  plays: number;
  rating: number;
  img?: string;
  link: string; // required for navigation
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  name,
  tags,
  plays,
  rating,
  img,
  link,
}) => {
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);
  const [indexOfOverflowingTag, setIndexOfOverflowingTag] =
    useState<number>(Infinity);
  const [largestOffsetTop, setLargestOffsetTop] = useState<number>(0);

  useEffect(() => {
    const subject = tagsContainerRef.current;

    // If the ref isn't attached yet, do nothing
    if (!subject) return;

    const observer = new ResizeObserver((entries) => {
      const tagContainer = entries[0].target as HTMLDivElement;

      // Find first tag that wrapped to a new line
      for (let i = 0; i < tagContainer.children.length; i++) {
        const tag = tagContainer.children[i] as HTMLSpanElement;
        if (tag.offsetTop - tagContainer.offsetTop > 0) {
          setIndexOfOverflowingTag(i);
          break;
        }
      }

      const lastChild = tagContainer.lastChild as HTMLSpanElement | null;
      if (lastChild) {
        setLargestOffsetTop(lastChild.offsetTop - tagContainer.offsetTop);
      }
    });

    observer.observe(subject);

    return () => {
      observer.unobserve(subject);
      observer.disconnect();
    };
  }, []);

  return (
    <Link href={link} className="block">
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="
          relative
          bg-[rgba(255,255,255,0.85)]
          backdrop-blur-md
          border border-[rgba(0,0,0,0.1)]
          rounded-3xl
          w-[320px] sm:w-[340px] lg:w-[360px]
          flex flex-col
          shadow-[0_6px_18px_rgba(0,0,0,0.1)]
          hover:shadow-[0_8px_22px_rgba(0,0,0,0.15)]
          cursor-pointer
          overflow-hidden
          transition-all duration-300
        "
      >
        {/* Image */}
        {img && (
          <div className="w-full p-7">
            <div className="w-full aspect-[1/1] overflow-hidden rounded-2xl relative">
              <Image
                src={img}
                alt={name}
                fill
                style={{ objectFit: "contain" }}
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 340px, 360px"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className="p-5 flex flex-col gap-3 flex-1"
          style={{ marginTop: -1 * largestOffsetTop }}
        >
          <h3 className="text-lg font-bold text-[#0F4C5C]">{name}</h3>

          <div className="flex flex-wrap gap-1.5" ref={tagsContainerRef}>
            {/* Simple tags rendering (no truncation) */}
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-[#F6EDE8]/60 border border-[#ddd]/40 text-[#333] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}

            {/* If later you want the "+N" behavior back, you can bring back your previous logic
                and use indexOfOverflowingTag state. */}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-600 mt-auto pt-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: rating }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p>{plays.toLocaleString()} plays</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default FeaturedCard;
