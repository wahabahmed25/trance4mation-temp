"use client";
import React from "react";
import Navbar from "@/home-page/sections/HomeNavbar";
import { motion } from "framer-motion";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const PALETTE = {
  violet: "#A78BFA",
  coral: "#FF6F61",
  blue: "#7EC8E3",
  gold: "#F4C95D",
  teal: "#0F4C5C",
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0F4C5C] via-[#1a1a1a] to-[#0F4C5C] text-white overflow-hidden">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-10 py-12"
      >
        {children}
      </motion.main>

      <div
        aria-hidden
        className="pointer-events-none absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full blur-3xl opacity-20"
        style={{ background: PALETTE.violet }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[250px] w-[250px] rounded-full blur-3xl opacity-10"
        style={{ background: PALETTE.blue }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] w-[600px] blur-[120px] opacity-5"
        style={{ background: PALETTE.gold }}
      />
    </div>
  );
};

export default HomeLayout;
