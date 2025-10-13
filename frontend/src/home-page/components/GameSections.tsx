"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FeaturedCard from "../components/FeaturedCard";
import featuredGames from "@/fake-game-data/games.json";

interface GameSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  filterKey?: keyof typeof featuredGames[number]; // e.g. "isTrending" | "featured" | "continuePlaying"
  filterValue?: boolean | string; // true, false, or specific tag
  limit?: number; // slice limit
  cardStyle?: "featured" | "compact"; // optional styling variants
}

const GameSection: React.FC<GameSectionProps> = ({
  title,
  subtitle,
  viewAllLink = "/featured",
  filterKey = "",
  filterValue = true,
  limit = 4,
  cardStyle = "featured",
}) => {
  // Filter and slice dynamically
  const filteredGames = featuredGames
    .filter((game: any) => {
      if (filterKey && filterValue !== undefined) {
        return game[filterKey] === filterValue;
      }
      return true;
    })
    .slice(0, limit);

  return (
    <section className="relative mx-auto max-w-7xl px-14 py-7 text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 text-sm">{subtitle}</p>
          )}
        </div>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-white/70 hover:text-white border border-white/10 rounded-xl px-3 py-1 text-sm transition"
          >
            View all →
          </Link>
        )}
      </div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`grid ${
          cardStyle === "compact"
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        } gap-4`}
      >
        {filteredGames.map((game, index) => (
          <FeaturedCard key={index} {...game} />
        ))}
      </motion.div>
    </section>
  );
};

export default GameSection;
