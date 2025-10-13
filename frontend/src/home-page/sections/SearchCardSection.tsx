"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const PALETTE = {
  coral: "#FF6F61", // bright accent
  coralSoft: "#FCA17D", // warm muted orange for headers
  cream: "#F6EDE8", // background tone
  blue: "#7EC8E3", // subtle accent
  textDark: "#2C2C2C",
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
                 bg-white/70 backdrop-blur-xl 
                 border border-[rgba(0,0,0,0.05)]
                 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                 p-8 sm:p-10 text-left flex flex-col justify-between"
    >
      {/* Background subtle gradient for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
                   bg-gradient-to-br from-[#ffffff]/70 via-[#F6EDE8]/30 to-[#FDE7D8]/30"
      />

      {/* Foreground content */}
      <div className="relative z-10 space-y-5">
        {/* Header */}
        <h1
          className="text-4xl sm:text-3xl md:text-4xl font-extrabold mb-2 leading-tight"
          style={{ color: PALETTE.coralSoft }}
        >
          Build Calm, Focus, and Resilience — Through Play
        </h1>

        <p className="text-[#333]/70 text-sm sm:text-base max-w-2xl mb-6">
          Discover games designed for emotional wellness. Track your mood,
          share moments, and connect with others — one mindful step at a time.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleSearch}
            className="rounded-lg bg-gradient-to-r from-[#FFB199] via-[#FF8661] to-[#FF6F61]
             px-6 py-2.5 text-white font-semibold 
             shadow-[0_0_10px_rgba(255,111,97,0.4)] 
             hover:shadow-[0_0_15px_rgba(255,111,97,0.6)] 
             hover:scale-[1.02] active:scale-[0.98] 
             transition-all duration-200"
          >
            Try a Featured Game
          </button>
          <Link
            href="/mood"
            className="rounded-lg border border-[#FF8661]/30 px-6 py-2.5 text-[#FF6F61] hover:bg-[#FF6F61]/10 transition"
          >
            Log Today’s Mood
          </Link>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl">
          <label htmlFor="search" className="sr-only">
            Search games
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-[#000]/10 bg-white/60 px-4 py-2.5 backdrop-blur-sm">
            <span className="text-lg text-[#FF6F61]">🔎</span>
            <input
              id="search"
              value={query}
              onChange={handleChange}
              placeholder="Search games, e.g. focus, breathing, gratitude…"
              className="w-full bg-transparent text-sm text-[#333] placeholder:text-[#777] focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-[#000]/10 bg-white/40 px-3 py-1 
                           text-[#444] hover:border-[#FF6F61]/40 hover:text-[#FF6F61] transition-all"
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
