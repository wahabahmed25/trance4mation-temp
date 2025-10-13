"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../images/play-to-heal.png";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 
                 backdrop-blur-lg shadow-md 
                 border-b border-[rgba(255,255,255,0.2)]"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,177,153,0.85) 0%, rgba(255,177,153,0.85) 50%, rgba(255,177,153,0.85) 100%)",
      }}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-3">
        {/* Left — Logo + Title */}
        <Link href="/home">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src={logo}
              alt="Play-to-Heal Logo"
              width={45}
              height={45}
              className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
            />
            <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              PLAY-TO-HEAL
            </h1>
            <span className="text-sm md:text-base text-white/90 italic">
              {user?.name || "Guest"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link
            href="/about"
            className="text-white/90 hover:text-white font-medium transition-colors drop-shadow-sm"
          >
            About
          </Link>
          <Link
            href="/games"
            className="text-white/90 hover:text-white font-medium transition-colors drop-shadow-sm"
          >
            Games
          </Link>
          <Link
            href="/landing"
            className="text-white/90 hover:text-white font-medium transition-colors drop-shadow-sm"
          >
            Landing
          </Link>
          <Link
            href="/logout"
            className="text-white/90 hover:text-white font-medium transition-colors drop-shadow-sm"
          >
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 w-full backdrop-blur-xl shadow-lg md:hidden z-40 border-t border-[rgba(255,255,255,0.2)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,177,153,0.95) 0%, rgba(255,134,97,0.95) 60%, rgba(255,111,97,0.95) 100%)",
            }}
          >
            <div className="flex flex-col items-center gap-6 py-8 text-xl">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/games"
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors"
              >
                Games
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/logout"
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors"
              >
                Logout
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
