"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const { user, logoutUser } = useAuth();
  console.log(user)

  useEffect(() => {
    const onScroll = () => {
      const o = Math.min(window.scrollY / 350, 1);
      setOpacity(o);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FIX: allow CSS variable type safely without any
  const style: React.CSSProperties & { "--nav-bg"?: string } = {
    "--nav-bg": "rgba(126, 200, 227, 0.95)",
    backgroundImage: `linear-gradient(to bottom, var(--nav-bg), rgba(255,255,255,${opacity}))`,
    transition: "background-image 0.4s ease",
  };

  const desktopLinks = [
    { label: "Features", href: "/features" },
    { label: "Profile", href: "/profile" },
    { label: "About", href: "/landing/about" },
    { label: "FAQ", href: "/landing/faq" },
    { label: "Logout", href: "/login", onClick: logoutUser },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-[25px]"
      style={style}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3">
          <Image
            src="/play-to-heal.png"
            alt="Play-to-Heal Logo"
            width={45}
            height={45}
            className="object-contain"
          />
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            PLAY-TO-HEAL
          </h1>
          <span className="text-white/90 italic text-sm md:text-base">
            {user?.name || "Guest"}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-16">
          {desktopLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="
                text-white
                text-lg font-semibold tracking-wide
                px-1 py-2 rounded-xl
                transition-all duration-300
                hover:bg-[rgba(255,111,97,0.15)]
              "
              onClick={l.onClick}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((s) => !s)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              md:hidden
              absolute top-full left-0 w-full
              border-t border-white/20
              backdrop-blur-[25px]
              z-40
            "
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                var(--nav-bg),
                rgba(255,255,255,${Math.max(opacity, 0.85)})
              )`,
            }}
          >
            <div className="flex flex-col items-center gap-6 py-8 text-xl">
              {desktopLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => { 
                    l.onClick?.()
                    setIsOpen(false) 
                  }}
                  className="
                    text-white text-shadow-black text-shadow-xs
                    font-semibold tracking-wide
                    px-4 py-2 rounded-xl
                    hover:bg-[rgba(255,111,97,0.15)]
                    transition-colors
                  "
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
