"use client";
import React from "react";
import Navbar from "@/features/home/components/HomeNavbar";
import { motion } from "framer-motion";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const PALETTE = {
  cream: "#F6EDE8",
  coralLight: "#FDE7D8",
  coral: "#FCA17D", // soft warm base
  coralDeep: "#F6765E", // subtle depth accent
  blueTop: "#7EC8E3", // sky blue top
  gold: "#FFD166",
  violet: "#A78BFA",
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div
      className="relative min-h-screen flex flex-col text-[#2C2C2C] overflow-hidden"
      style={{
        // reversed gradient: warm coral/peach bottom → soft blue top
        background:
          "linear-gradient(180deg, #FDE7D8 0%, #FDF7F8 35%, #FFF7D8 100%)",
      }}
    >
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-10 py-23"
      >
        {children}
      </motion.main>

      {/* === Ambient glow layers === */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-100px] left-[-100px] h-[320px] w-[320px] rounded-full blur-[120px] opacity-10"
        style={{ background: PALETTE.violet }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[250px] w-[250px] rounded-full blur-[150px] opacity-15"
        style={{ background: PALETTE.gold }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-60px] left-1/2 -translate-x-1/2 h-[200px] w-[600px] blur-[150px] opacity-07"
        style={{ background: PALETTE.coral }}
      />
    </div>
  );
};

export default HomeLayout;
