"use client";
import SignupNavbar from "@/user-signup/signup/SignupNavbar";
import React from "react";
import Link from "next/link";
export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#910719] via-[#8e097a] to-[#5d1689] text-white">
      
      <SignupNavbar />

      <main className="
        flex flex-col md:flex-row 
        justify-between items-center
        max-w-6xl mx-auto 
        px-8 md:px-16 py-10
        min-h-[75vh]  /* ⬅ stabilizes layout height */
      ">
        
        {/* LEFT SIDE CONTENT */}
        <div className="
          flex flex-col 
          gap-5
          w-full md:w-1/2 
          min-h-[420px]   /* ⬅ same height every page */
          justify-start    /* ⬅ prevents logo shifting */
        ">
          <h1 className="text-4xl font-extrabold tracking-wide leading-tight">
            {title}
          </h1>

          <p className="text-gray-300 text-lg ml-1 tracking-wide opacity-90">
            {subtitle}
          </p>

          <div className="flex-grow flex flex-col gap-4">
            {children}
          </div>

          <p className="text-center text-gray-300 text-sm">
            {footerText}{" "}
            <Link href={footerLinkHref} className="text-[#c82e13] hover:text-[#ea320d] font-semibold">
              {footerLinkText}
            </Link>
          </p>
        </div>

        {/* RIGHT LOGO */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-10 md:mt-0">
          <div className="relative flex justify-center items-center">

            {/* Glow */}
            <div className="
              absolute 
              w-[360px] h-[360px] 
              md:w-[420px] md:h-[420px]
              bg-gradient-to-tr from-[#FF512F] to-[#F09819]
              rounded-full blur-3xl opacity-30
            " />

            {/* Logo */}
            <img
  src="/play-to-heal.png"
  alt="Play to Heal Logo"
  className="
    relative ml-20 
    w-[300px] md:w-[450px]
    drop-shadow-[0_0_45px_rgba(255,10,40,1)]

  "
/>

          </div>
        </div>
      </main>

    </div>
  );
}
