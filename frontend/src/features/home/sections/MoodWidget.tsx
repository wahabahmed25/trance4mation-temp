"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Calendar, Users } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy", color: "#FFD166" },
  { emoji: "😐", label: "Neutral", color: "#7EC8E3" },
  { emoji: "😔", label: "Sad", color: "#A78BFA" },
  { emoji: "😠", label: "Angry", color: "#F6765E" },
  { emoji: "🕊️", label: "Calm", color: "#A3E4B3" },
  { emoji: "😴", label: "Tired", color: "#CFCFEA" },
];

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
        <div className="flex gap-5 text-3xl mt-10 flex-inline">
          {moods.map((m, i) => (
            <Link key={i} href="/mood-calendar">
              <motion.span
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="cursor-pointer select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                style={{ color: m.color }}
                title={m.label}
              >
                {m.emoji}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Mode Buttons / Linked */}
        <div className="flex gap-3 mt-10">
          <Link
            href="/discussion-circle"
            className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
            text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
            transition-all text-sm flex items-center gap-1"
          >
            <MessageCircle size={16} /> Circle
          </Link>

          <Link
            href="/mood-calendar"
            className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
            text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
            transition-all text-sm flex items-center gap-1"
          >
            <Calendar size={16} /> Mood
          </Link>

          <Link
            href="/social"
            className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
            text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
            transition-all text-sm flex items-center gap-1"
          >
            <Users size={16} /> Social
          </Link>
        </div>

        <p className="text-[#444]/60 text-xs mt-4">
          Your emotional well-being matters 💛
        </p>

      </div>
    </motion.section>
  );
};

export default MoodWidget;
