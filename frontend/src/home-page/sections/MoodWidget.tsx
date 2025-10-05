"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Calendar, Users } from "lucide-react";

const moods = [
  { emoji: "😄", label: "Happy", color: "#F4C95D" }, // golden glow
  { emoji: "😊", label: "Content", color: "#7EC8E3" }, // sky blue
  { emoji: "😐", label: "Neutral", color: "#A78BFA" }, // soft violet
  { emoji: "😔", label: "Sad", color: "#FF6F61" }, // coral
  { emoji: "😡", label: "Angry", color: "#F87171" }, // red accent
];

const MoodWidget = () => {
  return (
    <Link href="/mood-calender">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-3xl bg-[#0C1723]/80 backdrop-blur-md border border-white/10 shadow-2xl p-8 text-left flex flex-col justify-between"
      >
        {/* Background gradient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1e1e2e]/20 via-[#141e2a]/30 to-[#1f1f2e]/40"
        />

        <div className="relative z-10">
          {/* Header */}
          <h3 className="text-2xl font-bold text-white mb-2">
            Log your mood today
          </h3>
          <p className="text-white/70 text-sm mb-6">
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
                    className="text-3xl md:text-4xl"
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
              className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl px-3 py-1.5 text-sm transition"
            >
              <MessageCircle size={16} />
              Circle
            </Link>
            <Link
              href="/mood"
              className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl px-3 py-1.5 text-sm transition"
            >
              <Calendar size={16} />
              Mood
            </Link>
            <Link
              href="/social"
              className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl px-3 py-1.5 text-sm transition"
            >
              <Users size={16} />
              Social
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-white/60">
            Your emotional well-being matters{" "}
            <span className="text-[#7EC8E3]">💙</span>
          </p>
        </div>
      </motion.section>
    </Link>
  );
};

export default MoodWidget;
