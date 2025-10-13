"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Calendar, Users } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy", color: "#FFD166" }, // warm gold
  { emoji: "😐", label: "Neutral", color: "#A78BFA" }, // soft violet
  { emoji: "😔", label: "Sad", color: "#FF8661" }, // coral
  { emoji: "😰", label: "Worried", color: "#FF6F61" }, // deep coral
  { emoji: "😡", label: "Angry", color: "#F87171" }, // red accent
];

const MoodWidget = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-3xl
                 bg-white/60 backdrop-blur-xl
                 border border-[rgba(0,0,0,0.08)]
                 shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                 p-8 text-left flex flex-col justify-between"
    >
      {/* Subtle soft gradient for warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
                   bg-gradient-to-br from-[#ffffff]/70 via-[#F6EDE8]/80 to-[#FDE7D8]/60"
      />

      <div className="relative z-10">
        {/* Header */}
        <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-2">
          Log your mood today
        </h3>
        <p className="text-[#444]/70 text-sm mb-6">
          Reflect and track your emotions through playful moods.
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
          {/* Circle */}
          <Link
            href="/discussion-circle"
            className="flex items-center gap-1
                       
                       text-black rounded-xl px-3 py-1.5 text-sm 
                       hover:shadow-[0_0_18px_rgba(255,111,97,0.6)]
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-all duration-200"
          >
            <MessageCircle size={16} />
            Circle
          </Link>

          {/* Mood */}
          <Link
            href="/mood-calendar"
            className="flex items-center gap-1
                       
                       text-black rounded-xl px-3 py-1.5 text-sm 
                       hover:shadow-[0_0_18px_rgba(255,111,97,0.6)]
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-all duration-200"
          >
            <Calendar size={16} />
            Mood
          </Link>

          {/* Social */}
          <Link
            href="/social"
            className="flex items-center gap-1
                       
                       text-black rounded-xl px-3 py-1.5 text-sm 
                       hover:shadow-[0_0_18px_rgba(255,111,97,0.6)]
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-all duration-200"
          >
            <Users size={16} />
            Social
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#666]">
          Your emotional well-being matters{" "}
          <span className="text-[#FFD166]">💛</span>
        </p>
      </div>
    </motion.section>
  );
};

export default MoodWidget;
