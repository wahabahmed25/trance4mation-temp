"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // for the icons
import logo from "../../images/play-to-heal.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0F4C5C]/90 backdrop-blur-md shadow-lg">
      <div className="flex justify-between items-center px-6 md:px-10 py-3">
        <Link href="/home">
       
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Play-to-Heal Logo"
            width={45}
            height={45}
            className="object-contain"
          />
          <h1 className="text-lg md:text-2xl font-bold text-[#F4C95D] tracking-wide">
            PLAY-TO-HEAL
          </h1>
        </div>
         </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link href="/about" className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors">
            About
          </Link>
          <Link href="/games" className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors">
            Games
          </Link>
          <Link href="/landing" className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors">
            Landing
          </Link>
          <Link href="/logout" className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors">
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F4C95D] focus:outline-none"
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
            className="absolute top-full left-0 w-full bg-[#0F4C5C]/95 backdrop-blur-lg shadow-lg md:hidden z-40"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-xl">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors"
              >
                About
              </Link>
              <Link
                href="/games"
                onClick={() => setIsOpen(false)}
                className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors"
              >
                Games
              </Link>
              <Link
                href="/landing"
                onClick={() => setIsOpen(false)}
                className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors"
              >
                Landing
              </Link>
              <Link
                href="/logout"
                onClick={() => setIsOpen(false)}
                className="text-[#7EC8E3] hover:text-[#FF6F61] transition-colors"
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
