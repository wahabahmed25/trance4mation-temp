"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturedCard from "../components/FeaturedCard";
import featuredGames from "@/fake-game-data/games.json";

interface Game {
  id: string;
  title: string;
  image: string;
  multiplayer?: boolean;
  [key: string]: unknown; // replaced `any` with unknown
}

interface GameSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  filterKey?: keyof Game;
  filterValue?: boolean | string;
  limit?: number;
}

interface GameFromJson {
  name: string;
  description: string;
  tags: string[];
  plays: number;
  rating: number;
  featured: boolean;
  isTrending: boolean;
  continuePlaying: boolean;
  progress: number;
  link: string;
  img: string;
  isNew?: boolean;
  ForYou?: boolean;
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
    .filter((game) => {
      if (filterKey && filterValue !== undefined) {
        return game[filterKey as keyof GameFromJson] === filterValue;
      }
      return true;
    })
    .slice(0, limit);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // initial check
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollLeftHandler = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRightHandler = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-10 text-left">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F4C5C] mb-1">
            {title}
          </h2>
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-[#0F4C5C]/80 hover:text-[#0F4C5C] border border-[#0F4C5C]/20 rounded-xl px-3 py-1 text-sm transition"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="relative">
        <button
          onClick={scrollLeftHandler}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10
            p-2 rounded-full shadow-md transition-all duration-300
            bg-gradient-to-br from-[#DCCBFF] via-[#C6A8FF] to-[#F4A9D9]
            border border-white/40 backdrop-blur-xl
            hover:scale-105 hover:shadow-lg
            ${isAtStart ? "opacity-30 cursor-not-allowed hover:scale-100 hover:shadow-md" : ""}`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredGames.map((game, index) => (
            <div key={index} className="flex-none w-[280px] sm:w-[300px]">
              <FeaturedCard {...game} />
            </div>
          ))}
        </motion.div>

        <button
          onClick={scrollRightHandler}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10
            p-2 rounded-full shadow-md transition-all duration-300
            bg-gradient-to-br from-[#DCCBFF] via-[#C6A8FF] to-[#F4A9D9]
            border border-white/40 backdrop-blur-xl
            hover:scale-105 hover:shadow-lg
            ${isAtEnd ? "opacity-30 cursor-not-allowed hover:scale-100 hover:shadow-md" : ""}`}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
};

export default GameSection;
