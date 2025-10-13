"use client";
import React from "react";
import Navbar from "@/home-page/components/HomeNavbar";
import { motion } from "framer-motion";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const PALETTE = {
  violet: "#A78BFA",
  coralLight: "#FDE7D8",
  coral: "#FCA17D",
  coralDeep: "#F6765E",
  gold: "#FFD166",
  blue: "#7EC8E3",
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div
      className="relative min-h-screen flex flex-col text-[#2C2C2C] overflow-hidden"
      style={{
        // soft peach → coral gradient background
        background:
          "linear-gradient(180deg, #FDE7D8 0%, #FCA17D 45%, #FDE7D8 100%)",
      }}
    >
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-10 py-12"
      >
        {children}
      </motion.main>

      {/* === Subtle background glows for depth === */}
      {/* Soft violet glow (top left) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-100px] left-[-100px] h-[320px] w-[320px] rounded-full blur-[120px] opacity-15"
        style={{ background: PALETTE.violet }}
      />

      {/* Warm gold glow (bottom right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[250px] w-[250px] rounded-full blur-[150px] opacity-20"
        style={{ background: PALETTE.gold }}
      />

      {/* Cool blue subtle contrast (bottom center) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-60px] left-1/2 -translate-x-1/2 h-[200px] w-[600px] blur-[150px] opacity-10"
        style={{ background: PALETTE.blue }}
      />
    </div>
  );
};

export default HomeLayout;
