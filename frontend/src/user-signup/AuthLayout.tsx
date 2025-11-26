"use client";

import SignupNavbar from "@/user-signup/signup/SignupNavbar";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f4ade5] via-[#88a7cf] to-[#466eef] text-white">
      <SignupNavbar />

      <main
        className="
          flex flex-col md:flex-row 
          justify-between items-center
          max-w-7xl mx-auto 
          px-8 md:px-16 py-14
          min-h-[78vh]
        "
      >
        {/* LEFT SIDE CONTENT */}
        <div
          className="
            flex flex-col 
            gap-6
            w-full md:w-1/2 
            min-h-[500px]
            justify-start
          "
        >
          <h1
            className="
              text-5xl md:text-6xl 
              font-extrabold 
              tracking-tight 
              leading-tight 
              whitespace-nowrap
              bg-gradient-to-t from-[#d10202] via-[#de2b2b] to-[#FF4C4C]
              bg-clip-text text-transparent
              drop-shadow-lg
              font-serif
            "
          >
            {title}
          </h1>

          <p className="text-gray-200 text-xl md:text-2xl ml-1 opacity-90 leading-relaxed whitespace-nowrap">
            {subtitle}
          </p>

          <div
            className="
              flex flex-col gap-6 
              mt-4
              w-full
            "
          >
            {children}
          </div>

          <p className="text-center text-gray-300 text-base pt-4">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="text-[#ff5040] hover:text-[#ff6b5c] font-semibold"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>

        {/* RIGHT LOGO SIDE */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-12 ml-25 md:mt-0">
          <div className="relative flex justify-center items-center">
            {/* Glow */}
            <div
              className="
                absolute 
                w-[420px] h-[420px] 
                md:w-[520px] md:h-[520px]
                bg-gradient-to-tr from-[#FF512F] to-[#F09819]
                rounded-full blur-3xl opacity-30
              "
            />

            {/* Logo using <Image /> */}
            <div className="relative w-[320px] md:w-[500px] drop-shadow-[0_0_55px_rgba(255,50,70,1)]">
              <Image
                src="/play-to-heal.png"
                alt="Play to Heal Logo"
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
