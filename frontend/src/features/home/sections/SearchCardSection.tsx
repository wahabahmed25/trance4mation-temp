"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import featuredGames from "@/fake-game-data/games.json";

const tags = [
  "empathy",
  "courage",
  "community",
  "real talk",
  "connection",
  "college life",
  "identity",
  "vulnerability",
  "healing",
  "culture",
  "grief",
  "reflection",
  "memory",
  "expression",
  "confidence",
  "emotional release",
  "recovery",
  "support",
  "truth",
  "resilience",
];

interface Game {
  name: string;
  description: string;
  tags: string[];
  plays: number;
  rating: number;
  link: string;
  img?: string;
  featured?: boolean;
  isTrending?: boolean;
  continuePlaying?: boolean;
  progress?: number;
  [key: string]: unknown;
}

type ScoredGame = Game & {
  matchesAtLeastOneTag: boolean;
  matchesAllTags: boolean;
  nameMatchesQuery: boolean;
  descriptionMatchesQuery: boolean;
  [key: string]: unknown;
};

const searchWeights: Record<string, number> = {
  matchesAtLeastOneTag: 1,
  matchesAllTags: 2,
  nameMatchesQuery: 2,
  descriptionMatchesQuery: 1,
  plays: 1,
};

const SearchCardSection: React.FC = () => {
  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [enabledTags, setEnabledTags] = useState<string[]>([]);
  const [searchResultsVisible, setSearchResultsVisible] =
    useState<boolean>(false);

  const games = searchGames(
    featuredGames as Game[],
    query,
    enabledTags,
    searchWeights
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-[750px] mx-auto rounded-3xl 
        bg-white/80 backdrop-blur-xl 
        border border-[rgba(0,0,0,0.05)]
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        p-8 sm:p-10 flex flex-col justify-between
        z-1"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl
        bg-gradient-to-br from-white/85 via-[#F5F1FB]/40 to-[#EEF3FA]/30"
      />

      <div className="relative z-10 space-y-6">
        <h1
          className="text-4xl sm:text-3xl md:text-4xl font-extrabold leading-tight
          bg-gradient-to-r from-[#5b528a] via-[#456571] to-[#5c548a]
          text-transparent bg-clip-text drop-shadow-sm"
        >
          Play your way to Calm, Clarity, and Connection
        </h1>

        <p className="text-[#333]/75 text-sm sm:text-base max-w-2xl">
          Discover new ways to build resilience through meaningful,
          heart-opening games. Each moment of play helps you strengthen your
          emotional well-being - one gentle, joyful step at a time. Track your
          mood, celebrate growth, and share your journey with others!
        </p>

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
            Wherever you are, healing begins here.
          </button>

          <Link
            href="game-hub"
            className="rounded-lg border border-[#000]/10 px-6 py-2.5 
            text-[#444] hover:bg-[#000]/5 transition font-medium"
          >
            {`→ Let’s Play Together`}
          </Link>
        </div>

        {/* TAGS SCROLLER (with clicking fix) */}
        <div className="mt-4 max-w-full h-10 py-1 overflow-x-auto whitespace-nowrap flex gap-2 text-xs no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              className="inline-flex rounded-full border border-[#000]/10 bg-white/50 px-3 py-1.5
              text-[#555] hover:border-[#A78BFA] hover:text-[#A78BFA] transition-all"
              onClick={() => {
                if (enabledTags.includes(tag)) {
                  setEnabledTags(enabledTags.filter((element) => element !== tag));
                } else {
                  setEnabledTags([...enabledTags, tag]);
                }
              }}
              style={
                enabledTags.includes(tag)
                  ? { color: "#A78BFA", borderColor: "#A78BFA" }
                  : {}
              }
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="max-w-2xl flex flex-col">
          <div className="flex items-center gap-2 rounded-2xl border border-[#000]/10 bg-white/60 px-4 py-2.5">
            <span className="text-lg text-[#A78BFA]">🔍</span>
            <div className="w-full flex">
              <div className="flex pr-2 gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
                {enabledTags.map((tag) => (
                  <button
                    key={tag}
                    className="inline-flex rounded-full border border-[#000]/10 bg-white/50 px-3 py-1.5 text-[#555] text-xs"
                  >
                    #{tag}
                    <span
                      className="pl-1 font-bold cursor-pointer"
                      onClick={() =>
                        setEnabledTags(enabledTags.filter((t) => t !== tag))
                      }
                    >
                      x
                    </span>
                  </button>
                ))}
              </div>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchResultsVisible(true)}
                onBlur={() => setTimeout(() => setSearchResultsVisible(false), 150)}
                placeholder="Search games, e.g. focus, breathing, gratitude…"
                className="grow bg-transparent text-sm text-[#333] placeholder:text-[#777] focus:outline-none"
              />
            </div>
          </div>

          <div
            className="relative w-full"
            style={{ visibility: searchResultsVisible ? "visible" : "hidden" }}
          >
            <div className="absolute w-full rounded-2xl border border-[#000]/10 bg-white overflow-auto max-h-48">
              {games.map((game) => (
                <div
                  key={game.name}
                  className="hover:bg-[#000]/5 px-4 py-2.5 cursor-pointer"
                  onMouseDown={() => {
                    setQuery(game.name);
                    router.push(game.link);
                  }}
                >
                  {game.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SearchCardSection;

/* ------------------ SEARCH FUNCTIONS ------------------ */

// FIXED VERSION — always returns booleans, no more TS error
function searchGames(
  games: Game[],
  query: string,
  tags: string[],
  weights: Record<string, number>
): ScoredGame[] {
  const q = query.trim().toLowerCase();

  const searchResults: ScoredGame[] = games.map((game) => {
    const nameLower = (game.name || "").toLowerCase();
    const descLower = (game.description || "").toLowerCase();

    return {
      ...game,
      matchesAtLeastOneTag: game.tags.some((tag) => tags.includes(tag)),
      matchesAllTags: tags.length > 0 && tags.every((t) => game.tags.includes(t)),

      // TS-safe booleans (fix)
      nameMatchesQuery: q.length > 0 && nameLower.includes(q),
      descriptionMatchesQuery: q.length > 0 && descLower.includes(q),
    };
  });

  return searchResults.sort((a, b) => compareGames(a, b, weights));
}

function compareGames(
  a: ScoredGame,
  b: ScoredGame,
  weights: Record<string, number>
): number {
  let scoreA = 0;
  let scoreB = 0;

  Object.entries(weights).forEach(([feature, weight]) => {
    const vA = a[feature];
    const vB = b[feature];

    if (typeof vA === "boolean" && vA) scoreA += weight;
    if (typeof vB === "boolean" && vB) scoreB += weight;

    if (typeof vA === "number" && typeof vB === "number") {
      if (vA > vB) scoreA += weight;
      if (vA < vB) scoreB += weight;
    }
  });

  return scoreA - scoreB;
}
