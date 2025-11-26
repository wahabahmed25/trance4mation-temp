"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Removed PALETTE since it was unused

const tags = ["focus", "mindful", "sleep", "gratitude", "community"];

const SearchCardSection = () => {
  const [query, setQuery] = useState("");

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
        bg-gradient-to-br from-white/80 via-[#F6EDE8]/40 to-[#FDE7D8]/30"
      />

      <div className="relative z-10 space-y-6">
        <h1
          className="text-4xl sm:text-3xl md:text-4xl font-extrabold leading-tight
          bg-gradient-to-r from-[#A78BFA] via-[#7EC8E3] to-[#A78BFA]
          text-transparent bg-clip-text drop-shadow-sm"
        >
          Build Calm, Focus, and Resilience — Through Play
        </h1>

        <p className="text-[#333]/75 text-sm sm:text-base max-w-2xl">
          Discover games designed for emotional wellness. Track your mood, share
          moments, and connect with others — one mindful step at a time.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            className="rounded-lg 
              bg-gradient-to-r from-[#A78BFA] via-[#7EC8E3] to-[#C8B8FF]
              px-6 py-2.5 text-white font-semibold 
              shadow-[0_0_12px_rgba(167,139,250,0.35)]
              hover:shadow-[0_0_18px_rgba(167,139,250,0.55)]
              hover:scale-[1.03] active:scale-[0.97]
              transition-all duration-200"
          >
            Try a Featured Game
          </button>

          <Link
            href="/mood"
            className="rounded-lg border border-[#000]/10 px-6 py-2.5 
              text-[#444] hover:bg-[#000]/5 transition font-medium"
          >
            Log Today&apos;s Mood
          </Link>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl border border-[#000]/10 bg-white/60 px-4 py-2.5">
            <span className="text-lg text-[#A78BFA]">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games, e.g. focus, breathing, gratitude…"
              className="w-full bg-transparent text-sm text-[#333] placeholder:text-[#777] focus:outline-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="rounded-full border border-[#000]/10 bg-white/50 px-3 py-1
                  text-[#555] hover:border-[#A78BFA] hover:text-[#A78BFA] transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SearchCardSection;
