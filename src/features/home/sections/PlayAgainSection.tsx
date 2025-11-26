"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import gamesData from "@/fake-game-data/games.json";

const PALETTE = {
  gold: "#F4C95D",
  sky: "#7EC8E3",
  coral: "#FF6F61",
  violet: "#A78BFA",
};

const PlayAgainSection = () => {
  const continueGames = gamesData.filter((g) => g.continuePlaying);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-12 text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Play Again
          </h2>
          <p className="text-white/70 text-sm">
            Pick up where you left off
          </p>
        </div>
        <Link
          href="/continue"
          className="text-white/70 hover:text-white border border-white/10 rounded-xl px-3 py-1 text-sm transition"
        >
          View all →
        </Link>
      </div>

      {/* Games list */}
      <div className="flex flex-col divide-y divide-white/10 rounded-2xl bg-[#0B1A25]/50 border border-white/10 overflow-hidden">
        {continueGames.map((game, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
          >
            {/* Game Info */}
            <div className="flex items-center gap-4">
              <div className="bg-[#1f1f1f] p-2 rounded-lg">
                <Gamepad2 size={22} color={PALETTE.violet} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {game.name}
                </h3>
                <div className="flex gap-2 mt-1 text-xs text-white/70 flex-wrap">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col items-end gap-2 w-1/3 min-w-[150px]">
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${game.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      game.name === "Mind Quest"
                        ? PALETTE.gold
                        : game.name === "Calm Runner"
                        ? PALETTE.sky
                        : PALETTE.coral,
                  }}
                />
              </div>
              <p className="text-white/70 text-sm font-medium">
                {game.progress}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlayAgainSection;
