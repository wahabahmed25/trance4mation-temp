"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Calendar, Users } from "lucide-react";

const moods = [
  { emoji: "😄", label: "Happy", color: "#FFD166" }, // warm gold
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
                 bg-[rgba(250,150,107,0)] 
                 backdrop-blur-xl 
                 border border-[rgba(255,111,97,0.3)] 
                 shadow-[0_0_30px_rgba(255,111,97,0.2)] 
                 p-8 text-left flex flex-col justify-between"
    >
      {/* Background gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl 
                   bg-gradient-to-br from-[#FFB199]/30 via-[#FF8661]/25 to-[#FF6F61]/25"
      />

      <div className="relative z-10">
        {/* Header */}
        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
          Log your mood today
        </h3>
        <p className="text-white/80 text-sm mb-6">
          Reflect and track your emotions through playful moods.
        </p>

        {/* Emoji mood selector */}
        <div className="flex justify-start flex-wrap gap-3 mb-8">
          {moods.map((mood, i) => (
            <Link key={i} href="/mood">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="cursor-pointer select-none"
              >
                <span
                  className="text-3xl md:text-4xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
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
            href="/circle"
            className="flex items-center gap-1 
                       bg-white/10 hover:bg-white/20 
                       text-white/90 rounded-xl 
                       px-3 py-1.5 text-sm font-medium 
                       transition-all duration-200"
          >
            <MessageCircle size={16} />
            Circle
          </Link>

          <Link
            href="/mood-calendar"
            className="flex items-center gap-1 
                       bg-gradient-to-r from-[#FFB199] via-[#FF8661] to-[#FF6F61] 
                       text-white rounded-xl px-3 py-1.5 text-sm font-semibold 
                       shadow-[0_0_12px_rgba(255,111,97,0.4)] 
                       hover:shadow-[0_0_18px_rgba(255,111,97,0.6)] 
                       hover:scale-[1.02] active:scale-[0.98] 
                       transition-all duration-200"
          >
            <Calendar size={16} />
            Mood
          </Link>

          <Link
            href="/social"
            className="flex items-center gap-1 
                       bg-white/10 hover:bg-white/20 
                       text-white/90 rounded-xl 
                       px-3 py-1.5 text-sm font-medium 
                       transition-all duration-200"
          >
            <Users size={16} />
            Social
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/70">
          Your emotional well-being matters{" "}
          <span className="text-[#FFD166]">💛</span>
        </p>
      </div>
    </motion.section>
  );
};

export default MoodWidget;
