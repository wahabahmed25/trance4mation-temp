"use client";
import "./App.css";
import "./index.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
   /** nav bar gradient when user scrolls */
   const nav = useRef<HTMLElement | null>(null);
   // drop down menu
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const dropdownToggle = useRef<HTMLDivElement | null>(null);
   // mobile
   const [hamburgerOpen, setHamburgerOpen] = useState(false);

   const toggleHamburger = () => {
      setHamburgerOpen(!hamburgerOpen);
   };

   useEffect(() => {
      if (hamburgerOpen) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }

      return () => document.body.classList.remove("no-scroll");
   }, [hamburgerOpen]);

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
         const target = event.target as Element | null;
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
         <div
            className={`overlay ${hamburgerOpen ? "open" : ""}`}
            onClick={toggleHamburger}></div>
         <nav ref={nav} className={`nav ${hamburgerOpen ? "open" : ""}`}>
            <div className="nav-links">
               <Link href="/landing">Home</Link>
               <div
                  className={`dropdown ${dropdownOpen ? "open" : ""}`}
                  ref={dropdownToggle}>
                  <button
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className="dropbtn">
                     Games
                  </button>

                  <div className="dropdown-content">
                     <Link href="/landing/game#Remembrance">Remembrance</Link>
                     <Link href="/landing/game#Keep-It-Real-100">Keep It Real 100</Link>
                     <Link href="/landing/game#Keep-It-Real">Keep It Real</Link>
                     <Link href="/landing/game#Speak-to-me">Speak to Me</Link>
                     <Link href="/landing/game#Home-is-the-Heart">Home is the Heart</Link>
                     <Link href="/landing/game#Call-It-Out">Call It Out Loud</Link>
                     <Link href="/landing/game#Trill">Trill</Link>
                  </div>
               </div>

               <Link href="/landing/about">About</Link>
               <Link href="/landing/contact">Contact & Feedback</Link>
               <Link href="/landing/faq">FAQ</Link>
            </div>

            <div
               className={`hamburger-mobile ${hamburgerOpen ? "open" : ""}`}
               onClick={toggleHamburger}>
               <div className="hamburger-container">
                  <div className="burger burger1"></div>
                  <div className="burger burger2"></div>
                  <div className="burger burger3"></div>
               </div>
            </div>
         </nav>

         <div className={`side-drawer ${hamburgerOpen ? "open" : ""}`}>
            <div className="side-links">
               <Link href="/landing">Home</Link>
               <div
                  className={`dropdown ${dropdownOpen ? "open" : ""}`}
                  ref={dropdownToggle}>
                  <button
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className="dropbtn">
                     Games
                  </button>

                  <div className="dropdown-mobile">
                     <div className="dropdown-content">
                        <Link href="/landing/game#Speak-to-me">Speak to Me</Link>
                        <Link href="/landing/game#Keep-It-Real">Keep It Real</Link>
                        <Link href="/landing/game#Keep-It-Real-100">
                           Keep It Real 100
                        </Link>
                        <Link href="/landing/game#Home-is-the-Heart">
                           Home is the Heart
                        </Link>
                        <Link href="/landing/game#Remembrance">Remembrance</Link>
                        <Link href="/landing/game#Call-It-Out">Call It Out Loud</Link>
                        <Link href="/landing/game#Trill">Trill</Link>
                     </div>
                  </div>
               </div>

               <Link href="/landing/about">About</Link>
               <Link href="/landing/contact">Contact & Feedback</Link>
               <Link href="/landing/faq">FAQ</Link>
            </div>
         </div>

         <main>{children}</main>
      </div>
   );
}
