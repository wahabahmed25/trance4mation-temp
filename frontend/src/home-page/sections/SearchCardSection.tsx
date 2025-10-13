"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const PALETTE = {
  violet: "#A78BFA",
  coral: "#FF6F61",
  blue: "#7EC8E3",
  gold: "#F4C95D",
  teal: "#0F4C5C",
};

const tags = ["focus", "mindful", "sleep", "gratitude", "community"];

const SearchCardSection = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log(`Searching for: ${query}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-full rounded-3xl 
                 bg-[rgba(250,150,107,0)] 
                 backdrop-blur-xl 
                 border border-[rgba(255,111,97,0.3)]
                 shadow-[0_0_30px_rgba(255,111,97,0.2)]
                 p-6 text-left flex flex-col justify-between"
    >
      {/* Background glow overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl 
                   bg-gradient-to-br from-[#FFB199]/30 via-[#FF8661]/20 to-[#FF6F61]/25"
      />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Header */}
        <h1 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
          Build calm, focus, and resilience—through play
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-2xl mb-6">
          Bite-size games designed with mental wellness in mind. Track your
          mood, join a circle, and keep streaks that actually feel good.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleSearch}
            className="rounded-lg bg-gradient-to-r from-[#FFB199] via-[#FF8661] to-[#FF6F61] 
             px-6 py-2.5 text-white font-semibold 
             shadow-[0_0_12px_rgba(255,111,97,0.4)] 
             hover:shadow-[0_0_18px_rgba(255,111,97,0.6)] 
             hover:scale-[1.02] active:scale-[0.98] 
             transition-all duration-200"
          >
            Try a Featured Game
          </button>
          <Link
            href="/mood"
            className="rounded-lg border border-white/20 px-6 py-2.5 text-white/80 hover:text-white hover:border-white/40 transition"
          >
            Log today’s mood
          </Link>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl">
          <label htmlFor="search" className="sr-only">
            Search games
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5">
            <span className="text-lg">🔎</span>
            <input
              id="search"
              value={query}
              onChange={handleChange}
              placeholder="Search games, e.g. focus, breathing, gratitude…"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/80 hover:text-white hover:border-white/40 transition-all"
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
