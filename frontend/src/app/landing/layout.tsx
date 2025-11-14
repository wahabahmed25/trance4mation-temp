"use client";
import "./App.css";
import "./index.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
   /** nav bar gradient when user scrolls */
   const nav = useRef<HTMLElement | null>(null);

   const [dropdownOpen, setDropdownOpen] = useState(false);
   const dropdownToggle = useRef<HTMLDivElement | null>(null);

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

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            dropdownToggle.current &&
            !dropdownToggle.current.contains(event.target as Node)
         ) {
            setDropdownOpen(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);
   return (
      <div className="App">
         {/* Navigation */}
         <nav className="nav">
            <Link href="/landing">Home</Link>
            <div
               className={`dropdown ${dropdownOpen ? "open" : ""}`}
               ref={dropdownToggle}>
               <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropbtn">
                  Games
               </button>

               <div className="dropdown-content">
                  <Link href="/landing/game#Speak-to-me">Speak to Me</Link>
                  <Link href="/landing/game#Keep-It-Real">Keep It Real</Link>
                  <Link href="/landing/game#Keep-It-Real-100">Keep It Real 100</Link>
                  <Link href="/landing/game#Call-It-Out">Call It Out</Link>
                  <Link href="/landing/game#Remembrance">Remembrance</Link>
                  <Link href="/landing/game#Trill">Trill (True & Real)</Link>
                  <Link href="/landing/game#Home-is-the-Heart">Home is the Heart</Link>
               </div>
            </div>

            <Link href="/landing/about">About</Link>
            <Link href="/landing/contact">Contact</Link>
         </nav>
         <main>{children}</main>
      </div>
   );
}
