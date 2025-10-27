"use client";
import { motion } from "framer-motion";
import React from "react";

interface FeaturedCardProps {
  name: string;
  tags: string[];
  plays: number;
  rating: number;
  image?: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  name,
  tags,
  plays,
  rating,
  image,
}) => {
  return (
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
        min-h-[320px]
        flex flex-col justify-between
        shadow-[0_6px_18px_rgba(0,0,0,0.1)]
        hover:shadow-[0_8px_22px_rgba(0,0,0,0.15)]
        cursor-pointer
        overflow-hidden
        transition-all duration-300
      "
    >
      {/* Image */}
      {image && (
        <div className="h-[180px] w-full overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-[#0F4C5C] mb-1">{name}</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-[#F6EDE8]/60 border border-[#ddd]/40 text-[#333] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-xs text-gray-600 mt-auto">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <p>{plays.toLocaleString()} plays</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
