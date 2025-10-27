"use client";
import React from "react";
import Navbar from "@/home-page/components/HomeNavbar";
import { motion } from "framer-motion";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const PALETTE = {
  violet: "#A78BFA",
  gold: "#FFD166",
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div
      className="relative min-h-screen flex flex-col text-[#2C2C2C] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FDE7D8 0%, #F4E8F9 50%, #DDEBFF 100%)",
      }}
    >
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-10 py-20"
      >
        {children}
      </motion.main>

      {/* Soft ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full blur-[160px] opacity-20"
        style={{ background: PALETTE.violet }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-[260px] w-[260px] rounded-full blur-[160px] opacity-20"
        style={{ background: PALETTE.gold }}
      />
    </div>
  );
};

export default HomeLayout;
