"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Calendar, Users } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy", color: "#FFD166" }, // golden glow
  { emoji: "😐", label: "Neutral", color: "#7EC8E3" }, // sky blue
  { emoji: "😔", label: "Sad", color: "#A78BFA" }, // violet
  { emoji: "😠", label: "Angry", color: "#F6765E" }, // coral red
];

const MoodWidget = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-3xl
                 bg-white/60 backdrop-blur-xl
                 border border-[rgba(252,161,125,0.25)]
                 shadow-[0_8px_25px_rgba(252,161,125,0.15)]
                 p-8 text-left flex flex-col justify-between overflow-hidden"
    >
      {}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
                   bg-gradient-to-br from-[#ffffff]/70 via-[#F6EDE8]/80 to-[#FDE7D8]/60"
      />

      <div className="relative z-10">
        {/* Header */}
        <h3 className="text-2xl font-semibold text-[#3C2F2F] mb-2">
          Log your mood today
        </h3>
        <p className="text-[#5A4A47]/70 text-sm mb-6">
          Reflect and track your emotions through simple daily moods.
        </p>

        {/* Emoji mood selector */}
        <div className="flex justify-start flex-wrap gap-3 mb-8">
          {moods.map((mood, i) => (
            <Link key={i} href="/mood-calendar">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="cursor-pointer select-none"
              >
                <span
                  className="text-3xl md:text-4xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                  style={{ color: mood.color }}
                  title={mood.label}
                >
                  {mood.emoji}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link
            href="/discussion-circle"
            className="flex items-center gap-1 text-[#3C2F2F] rounded-xl px-3 py-1.5 text-sm 
                       hover:shadow-[0_0_18px_rgba(246,118,94,0.4)]
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-all duration-200 bg-white/70 border border-[#FCA17D]/30 backdrop-blur-sm"
          >
            <MessageCircle size={16} />
            Circle
          </Link>

          <Link
            href="/mood-calendar"
            className="flex items-center gap-1 text-[#3C2F2F] rounded-xl px-3 py-1.5 text-sm 
                       hover:shadow-[0_0_18px_rgba(246,118,94,0.4)]
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-all duration-200 bg-white/70 border border-[#FCA17D]/30 backdrop-blur-sm"
          >
            <Calendar size={16} />
            Mood
          </Link>

          <Link
            href="/social"
            className="flex items-center gap-1 text-[#3C2F2F] rounded-xl px-3 py-1.5 text-sm 
                       hover:shadow-[0_0_18px_rgba(246,118,94,0.4)]
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-all duration-200 bg-white/70 border border-[#FCA17D]/30 backdrop-blur-sm"
          >
            <Users size={16} />
            Social
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#6B5A56]">
          Your emotional well-being matters{" "}
          <span className="text-[#FFD166]">💛</span>
        </p>
      </div>
    </motion.section>
  );
};

export default MoodWidget;
