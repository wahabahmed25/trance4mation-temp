"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturedCard from "../components/FeaturedCard";
import featuredGames from "@/fake-game-data/games.json";

type Game = typeof featuredGames[number];

interface GameSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  filterKey?: keyof Game;
  filterValue?: boolean | string;
  limit?: number;
}

const GameSection: React.FC<GameSectionProps> = ({
  title,
  subtitle,
  viewAllLink = "/featured",
  filterKey,
  filterValue,
  limit = 10,
}) => {
  const filteredGames = featuredGames
    .filter((game: Game) => {
      if (filterKey && filterValue !== undefined) {
        return game[filterKey] === filterValue;
      }
      return true;
    })
    .slice(0, limit);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPos = () => {
    const c = scrollRef.current;
    if (!c) return;
    setIsAtStart(c.scrollLeft <= 0);
    setIsAtEnd(c.scrollLeft + c.clientWidth >= c.scrollWidth - 1);
  };

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    c.addEventListener("scroll", checkScrollPos);
    checkScrollPos();
    return () => c.removeEventListener("scroll", checkScrollPos);
  }, []);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-14 text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5b528a] tracking-tight drop-shadow-sm">
            {title}
          </h2>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-[#5b528a]/80 hover:text-[#5b528a] border border-[#5b528a]/20 rounded-xl px-4 py-1.5 text-sm transition backdrop-blur-sm bg-white/50"
          >
            View all →
          </Link>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 
            rounded-full shadow-md transition-all backdrop-blur-xl
            bg-white/70 border border-white/60 hover:scale-105 hover:shadow-lg
            ${isAtStart ? "opacity-30 cursor-not-allowed hover:scale-100" : ""}`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredGames.map((game, index) => (
            <div key={index} className="flex-none w-[280px] sm:w-[300px] lg:w-[320px] mr-10">
              <FeaturedCard {...game} />
            </div>
          ))}
        </motion.div>

        <button
          onClick={scrollRight}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2
            rounded-full shadow-md transition-all backdrop-blur-xl
            bg-white/70 border border-white/60 hover:scale-105 hover:shadow-lg
            ${isAtEnd ? "opacity-30 cursor-not-allowed hover:scale-100" : ""}`}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
};

export default GameSection;
