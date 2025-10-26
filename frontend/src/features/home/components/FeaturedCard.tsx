"use client";
import { motion } from "framer-motion";
import React from "react";

interface FeaturedCardProps {
  name: string;
  tags: string[];
  plays: number;
  rating: number; // 1–5
  isTrending?: boolean;
  isNew?: boolean;
  featured?: boolean;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  name,
  tags,
  plays,
  rating,
  isTrending,
  isNew,
  featured,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="
        relative 
        bg-[#0C1723]/60 
        backdrop-blur-sm 
        border border-white/10 
        rounded-2xl 
        p-4 sm:p-5 
        w-full sm:w-64 
        min-h-[160px] 
        flex flex-col justify-between 
        shadow-md 
        hover:shadow-lg 
        hover:border-white/20 
        cursor-pointer 
        transition-all
        
      "
    >
      {/* Title + Tags */}
      <div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2 line-clamp-1">
          {name}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {featured && (
            <span className="text-[10px] font-semibold bg-[rgba(244,201,93,0.15)] text-[#F4C95D] px-2 py-0.5 rounded-full whitespace-nowrap">
              FEATURED
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-[11px] bg-white/5 border border-white/10 text-white/70 px-2 py-0.5 rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Rating + Plays */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-white/70 mt-auto">
        <div className="flex items-center gap-1 flex-wrap">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i}>⭐</span>
          ))}

          {isTrending && (
            <span className="ml-1 text-[10px] text-[#F4C95D] font-semibold">
              TRENDING
            </span>
          )}
          {isNew && (
            <span className="ml-1 text-[10px] text-[#A78BFA] font-semibold">
              NEW
            </span>
          )}
        </div>
        <p className="text-right truncate">{plays.toLocaleString()} plays</p>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
