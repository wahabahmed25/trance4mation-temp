"use client";

import featuredGames from "@/fake-game-data/games.json";
import FeaturedCard from "@/features/home/components/FeaturedCard";
import Link from "next/link";
import React from "react";

const GameHubPage = () => {
  return (
    <div
      className="
        min-h-screen w-full
        bg-gradient-to-b
        from-[rgb(194,239,255)]
        via-[rgba(216,247,255,0.85)]
        to-[#def8ff]
        backdrop-blur-xl
        py-16 px-6
      "
      style={{
        "--nav-bg": "rgba(126, 200, 227, 0.95)",
      } as React.CSSProperties}
    >
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-extrabold text-[#0F4C5C] drop-shadow-sm">
          🎮 Game Hub
        </h1>
        <p className="text-gray-700 text-lg mt-2">
          Explore interactive activities designed to help you heal, relax, and grow.
        </p>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/home"
            className="
              inline-block
              px-7 py-3
              bg-[#0F4C5C]
              text-white
              rounded-full
              shadow-md
              hover:bg-[#0c3a47]
              transition-all duration-300
            "
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Grid Section */}
      <div
        className="
          max-w-6xl mx-auto
          grid
          gap-10
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          justify-items-center
        "
      >
        {featuredGames.map((game) => (
          <FeaturedCard
            key={game.name}
            name={game.name}
            tags={game.tags}
            plays={game.plays}
            rating={game.rating}
            img={game.img}
            link={game.link}
          />
        ))}
      </div>
    </div>
  );
};

export default GameHubPage;
