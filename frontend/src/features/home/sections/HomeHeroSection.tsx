"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HomeHeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center py-35 px-6 bg-gradient-to-b from-[#0F4C5C] via-[#0F4C5C]/90 to-black min-h-screen">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-[#F4C95D] tracking-wide"
      >
        TRANCE4MATION
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-[#E0E0E0]"
      >
        A safe space to play games, share, and grow together. Empowering healing
        through interactive experiences.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          href="/games"
          className="inline-block mt-8 bg-[#FF6F61] text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-[#FF4A3D] hover:scale-105 transform transition duration-300"
        >
          Explore Games
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeHeroSection;
