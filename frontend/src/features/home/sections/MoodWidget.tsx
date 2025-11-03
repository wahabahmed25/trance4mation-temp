"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const moods = ["😊", "😐", "😴", "😡", "🤧"];

const MoodWidget = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-full rounded-3xl
      bg-white/70 backdrop-blur-xl
      border border-[rgba(0,0,0,0.05)]
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      p-8 sm:p-10 flex flex-col justify-between"
    >

      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
        bg-gradient-to-br from-white/85 via-[#F5F1FB]/40 to-[#EEF3FA]/30"
      />

      <div className="relative z-10 space-y-6">
        
        {/* Title */}
        <h2
          className="text-3xl font-bold leading-tight
          bg-gradient-to-r from-[#5b528a] via-[#456571] to-[#5c548a]
          text-transparent bg-clip-text drop-shadow-sm"
        >
          Log your mood today
        </h2>

        <p className="text-[#333]/75 text-sm sm:text-base max-w-md">
          Reflect, track, and write why you feel the way you do — your emotions tell your story.
        </p>

        {/* Mood Emoji Row */}
        <div className="flex gap-4 text-4xl mt-3">
          {moods.map((m, i) => (
            <button
              key={i}
              className="hover:scale-[1.15] active:scale-[0.95] transition-transform"
            >
              {m}
            </button>
          ))}
        </div>

        {/* Mode Buttons */}
        <div className="flex gap-3 mt-6">
          {["Circle", "Mood", "Social"].map((label) => (
            <button
              key={label}
              className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
              text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
              transition-all text-sm"
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-[#444]/60 text-xs mt-4">
          Your emotional well-being matters 💛
        </p>

      </div>
    </motion.section>
  );
};

export default MoodWidget;
