"use client";
import Link from "next/link";
import Image from "next/image";
// import { useState } from "react";
import { HamburgerMenu } from "@/components/ui/HamburgerMenu";

const navbarItems = [
    {href: "/landing", text: "LANDING", underline: true},
    {href: "/landing/game", text: "COLLECTION"},
    {href: "/landing/about", text: "ABOUT"},
    {href: "/landing/faq", text: "FAQ"},
    {href: "/landing/contact", text: "CONTACT"},
]


const SignupNavbar = () => {
  return (
    <nav className="
      w-full 
      flex items-center justify-between
      px-6 md:px-16 py-5
      bg-gradient-to-t from-[#041f5f01] via-[#041f5f63] to-[#041f5f9d]
      backdrop-blur-2xl
      text-white
      
      sticky top-0 z-50
    ">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-4 shrink-0">
        <Image
          src="/play-to-heal.png"
          alt="Logo"
          width={70}
          height={70}
          className="hover:scale-105 transition-all cursor-pointer"
        />
      </div>

      {/* CENTER: Nav Links */}
      <div className="hidden md:flex items-center gap-10 text-base md:text-lg font-semibold tracking-wide">
        {navbarItems.map((item) => {
          return (
            <Link key={item.text} href={item.href} className="relative group hover:text-[#FF3B22] transition">
              {item.text}
              {item.underline ? <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#FF3B22] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> : null}
            </Link>
          )
        })}
      </div>

      {/* MOBILE: Hamburger dropdown */}
      <div className="md:hidden">
        <HamburgerMenu items={navbarItems}/>
      </div>
    </nav>
  );
};

export default SignupNavbar;
