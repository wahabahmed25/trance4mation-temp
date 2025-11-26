"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
<div className="relative min-h-screen w-full bg-gradient-to-br from-[#e8f3ff] via-[#d9ecff] to-[#c5e1ff] flex items-center justify-center px-6">

      {/* TOP RIGHT HOME BUTTON */}
      <Link
        href="/home"
        className="
          absolute top-6 right-6
          px-5 py-2.5
          bg-white/80 
          backdrop-blur-md 
          shadow-lg 
          border border-white/50 
          rounded-xl 
          text-[#524b8a] 
          font-semibold 
          text-sm
          hover:bg-white 
          hover:shadow-xl 
          hover:-translate-y-0.5
          transition-all duration-300
        "
      >
        Back to Home
      </Link>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          bg-white/60 backdrop-blur-xl border border-white/40
          rounded-3xl shadow-2xl p-12 max-w-lg text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#524b8a] drop-shadow-sm">
          Coming Soon
        </h1>

        <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
          We&apos;re crafting something meaningful and powerful.
          Stay tuned for the next evolution of our experience.
        </p>

        <div className="mt-8">
          <div
            className="w-16 h-16 border-4 border-[#524b8a]/40 border-t-[#524b8a] rounded-full mx-auto animate-spin"
          />
        </div>

        <p className="text-gray-500 text-xs mt-6">
          Thank you for your patience.
        </p>
      </motion.div>
    </div>
  );
}
