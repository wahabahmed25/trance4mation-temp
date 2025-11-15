"use client";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const SignupNavbar = () => {
  return (
    <nav className="
      w-full 
      flex items-center justify-between
      px-8 py-4
      bg-[#160016] 
      bg-gradient-to-r from-[rgba(20,0,30,0.85)] via-[rgba(30,0,40,0.85)] to-[rgba(20,0,30,0.85)]
      text-white
      shadow-lg
    ">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/play-to-heal.png"
          alt="Logo"
          width={60}
          height={58}
          className="hover:scale-105 transition-all cursor-pointer"
        />
      </div>

      {/* CENTER: Nav Links */}
      <div className="flex items-center gap-10 text-sm font-semibold tracking-wide">
        <Link href="/" className="relative group">
          HOME
          {/* active underline */}
          <span className="
            absolute left-0 -bottom-1 w-full h-[3px] 
            bg-[#FF3B22] rounded-full
          "></span>
        </Link>

        <Link href="/collection" className="hover:text-[#FF3B22] transition">COLLECTION</Link>
        <Link href="/offers" className="hover:text-[#FF3B22] transition">OFFERS</Link>
        <Link href="/about" className="hover:text-[#FF3B22] transition">ABOUT</Link>
        <Link href="/faq" className="hover:text-[#FF3B22] transition">FAQ</Link>
      </div>

      {/* RIGHT: Search Icon Button */}
      <button
        className="
          bg-[#FF3B22] hover:bg-[#ff2f18] 
          w-10 h-10 flex items-center justify-center
          rounded-md shadow-md 
          transition
        "
      >
        <Search size={20} />
      </button>
    </nav>
  );
};

export default SignupNavbar;
