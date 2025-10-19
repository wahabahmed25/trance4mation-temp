"use client";
import "./App.css";
import "./index.css";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
   /** nav bar gradient when user scrolls */
   const nav = useRef<HTMLElement | null>(null);

   useEffect(() => {
      function handleScroll() {
         if (nav.current) {
            const scrollPosition = window.scrollY;
            const opacity = Math.min(scrollPosition / 350, 1);
            nav.current.style.backgroundImage = `linear-gradient(to bottom, var(--nav-bg), rgba(255, 255, 255, ${opacity}))`;
         }
      }
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);
   return (
      <div className="App">
         {/* Navigation */}
         <nav className="nav">
            <Link href="/home">Home</Link>
            {/*<Link href="/game">Game</Link>*/}
            <Link href="/landing/pages/about">About</Link>
            <Link href="/landing/pages/faq">FAQ</Link>
         </nav>
         <main>{children}</main>
      </div>
   );
}
