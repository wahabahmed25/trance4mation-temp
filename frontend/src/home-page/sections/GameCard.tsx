"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const games = [
  { name: "Mind Quest", color: "#F4C95D" }, // golden glow
  { name: "Calm Runner", color: "#7EC8E3" }, // sky blue
  { name: "Focus Builder", color: "#FF6F61" }, // healing coral
  { name: "Test Puzzle", color: "#A78BFA" }, // soft violet
];

const GameCard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-8 sm:px-6 lg:px-10 bg-[#1f1f1f]/90 flex flex-col items-center text-center rounded-2xl shadow-lg border border-[#7EC8E3]/20 hover:shadow-[#A78BFA]/20 transition-all"
    >
      {/* Header */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold text-[#FF6F61] mb-6 tracking-wide"
      >
        Game Hub
      </motion.h3>

      {/* Game Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-3xl place-items-center"
      >
        {games.map((game, i) => (
          <Link href="/" key={i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="bg-[#1f1f1f] w-36 sm:w-44 p-4 rounded-xl shadow-md border border-[#7EC8E3]/30 cursor-pointer hover:bg-[#A78BFA]/20 transition-all flex justify-center items-center"
            >
              <p
                className="text-sm sm:text-base font-semibold text-center"
                style={{ color: game.color }}
              >
                {game.name}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default GameCard;
