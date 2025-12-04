"use client";
import Link from "next/link";
import Image from "next/image";

const SignupNavbar = () => {
  return (
    <nav className="
      w-full 
      flex items-center justify-between
      px-12 md:px-16 py-5
      bg-gradient-to-t from-[#041f5f01] via-[#041f5f63] to-[#041f5f9d]
      backdrop-blur-2xl
      text-white
      
      sticky top-0 z-50
    ">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-4">
        <Image
          src="/play-to-heal.png"
          alt="Logo"
          width={70}
          height={70}
          className="hover:scale-105 transition-all cursor-pointer"
        />
      </div>

      {/* CENTER: Nav Links */}
      <div className="flex items-center gap-12 text-base md:text-lg font-semibold tracking-wide">
        <Link href="/landing" className="relative group hover:text-[#FF3B22] transition">
          LANDING
          <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#FF3B22] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>

        <Link href="/landing/game" className="hover:text-[#FF3B22] transition">COLLECTION</Link>
        <Link href="/landing/about" className="hover:text-[#FF3B22] transition">ABOUT</Link>
        <Link href="/landing/faq" className="hover:text-[#FF3B22] transition">FAQ</Link>
        <Link href="/landing/contact" className="hover:text-[#FF3B22] transition">CONTACT</Link>
      </div>
    </nav>
  );
};

export default SignupNavbar;
