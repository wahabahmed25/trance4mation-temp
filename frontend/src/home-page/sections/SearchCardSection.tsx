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
      className="w-full h-full rounded-3xl bg-[#0C1723]/80 backdrop-blur-md border border-white/10 shadow-2xl p-6 text-left flex flex-col justify-between"
    >
      {/* Background gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1e1e2e]/20 via-[#0b2230]/40 to-[#1f1f2e]/30"
      />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Header */}
        <h1 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          Build calm, focus, and resilience—through play
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mb-6">
          Bite-size games designed with mental wellness in mind. Track your
          mood, join a circle, and keep streaks that actually feel good.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleSearch}
            className="rounded-lg bg-gradient-to-r from-[#F4C95D] to-[#7EC8E3] px-6 py-2.5 text-black font-semibold hover:opacity-90 transition"
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
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5">
            <span className="text-lg">🔎</span>
            <input
              id="search"
              value={query}
              onChange={handleChange}
              placeholder="Search games, e.g. focus, breathing, gratitude…"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 hover:text-white hover:border-white/30 transition-all"
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
