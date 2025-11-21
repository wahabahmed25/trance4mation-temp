"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import featuredGames from "@/fake-game-data/games.json";

const PALETTE = {
  violet: "#A78BFA",
  blue: "#7EC8E3",
  coral: "#FF6F61",
  coralSoft: "#FCA17D",
  cream: "#F6EDE8",
};

const tags = ["focus", "mindful", "sleep", "gratitude", "community"];

/**
 * A dictionary indicating how much weight to give to each condition when comparing 2 games in search results
 * Ex: { plays : 1 } means that compareGames will give 1 point to the game with the higher number of plays
 *     { nameMatchesQuery : 2 } means that compareGames() will give 2 points to any game whose name includes query
 * 
 * Keys can be any key shared by all games in games.json
 * Custom keys can also be defined in searchGames()
 */
const searchWeights: Record<string, number> = {
  matchesAtLeastOneTag:     1,
  matchesAllTags:           2,
  nameMatchesQuery:         2,
  descriptionMatchesQuery:  1,
  plays:                    1
}

const SearchCardSection = () => {
  const [query, setQuery] = useState("");
  const [enabledTags, setEnabledTags] = useState<string[]>([])
  console.log(searchGames(featuredGames, query, enabledTags, searchWeights))

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
      {/* Soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
bg-gradient-to-br from-white/85 via-[#F5F1FB]/40 to-[#EEF3FA]/30"

      />

      <div className="relative z-10 space-y-6">
        {/* 💫 Header Text — Blue → Violet Gradient */}
        <h1
          className="text-4xl sm:text-3xl md:text-4xl font-extrabold leading-tight
          bg-gradient-to-r from-[#5b528a] via-[#456571] to-[#5c548a]
          text-transparent bg-clip-text drop-shadow-sm"
        >
          Build Calm, Focus, and Resilience — Through Play
        </h1>

        <p className="text-[#333]/75 text-sm sm:text-base max-w-2xl">
          Discover games designed for emotional wellness. Track your mood, share
          moments, and connect with others — one mindful step at a time.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            className="
    rounded-lg 
bg-gradient-to-r from-[#514753] via-[#463b41] to-[#2b2523]
    px-6 py-2.5 
    text-white font-semibold 
    shadow-[0_0_12px_rgba(167,139,250,0.35)]
    hover:shadow-[0_0_18px_rgba(167,139,250,0.55)]
    hover:scale-[1.03] 
    active:scale-[0.97]
    transition-all duration-200
  "
          >
            Try a Featured Game
          </button>

          <Link
            href="/mood"
            className="rounded-lg border border-[#000]/10 px-6 py-2.5 
            text-[#444] hover:bg-[#000]/5 transition font-medium"
          >
            Log Today's Mood
          </Link>
        </div>

        {/* Search Input */}
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

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <button
                key={tag}
                className="rounded-full border border-[#000]/10 bg-white/50 px-3 py-1
                text-[#555] hover:border-[#A78BFA] hover:text-[#A78BFA] transition-all"
                // toggle this tag on / off
                onClick={() => {
                  if (enabledTags.includes(tag)) {
                    setEnabledTags(enabledTags.filter(element => element != tag))
                  } else {
                    setEnabledTags([...enabledTags, tag])
                  }
                }}
                // if this tag is enabled, keep it highlighted in purple
                style={ enabledTags.includes(tag) ? { color: "#A78BFA", borderColor: "#A78BFA", backgroundColor: "rgba(0,0,0,0.05)" } : {} }
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

/**
 * Sorts all games in order of descnding score according to the given search parameters
 * @param games A list of games to search through
 * @param query The text entered into the search bar
 * @param tags A list of enabled tags
 * @param weights Weights for comparing games to determine the order of results
 * @returns The list of games sorted by descending score. Score is determined by the weights param
 */
function searchGames(games, query: string, tags: string[], weights: Record<string, number>) {
  const searchResults = games.reduce((results, game) => {
    return [...results, {
      ...game,
      matchesAtLeastOneTag:     game.tags.some((tag) => tags.includes(tag)),
      matchesAllTags:           game.tags.every((tag) => tags.includes(tag)),
      nameMatchesQuery:         game.name.toLowerCase().includes(query.trim().toLowerCase()),
      descriptionMatchesQuery:  game.description.toLowerCase().includes(query.trim().toLowerCase())
    }]
  }, [] as unknown[])

  return searchResults.sort((a, b) => {
    const scoreDifference = compareGames(a, b, weights)
    return Math.sign(scoreDifference) * -1
  })
}

/**
 * Calculates the difference in score between 2 games a and b. 
 * Score is calculated using a given set of weights that maps the name of a field to the number of points to award based on that field.
 * If the type of a field is a boolean, then points are awarded if the value is true
 * If the type of a field is a number, then points are awarded to the game with higher value
 * @param a A dictionary representing a game
 * @param b Another dictionary representing a game
 * @param weights A dictionary whose keys are names of fields in a and b, and whose values are the number of points to award based on that field
 * @returns 
 */
function compareGames(a, b, weights: Record<string, number>) {
  let scoreA = 0
  let scoreB = 0

  Object.entries(weights).forEach(([feature, weight]) => {
    const featureA = a[feature]
    const featureB = b[feature]

    switch (typeof(featureA)) {
      case "boolean":
        if (featureA) { scoreA += weight }
        if (featureB) { scoreB += weight }
        break
      case "number":
        if (featureA > featureB) { scoreA += weight }
        if (featureA < featureB) { scoreB += weight }
        break
    }
  })

  return scoreA - scoreB
}
