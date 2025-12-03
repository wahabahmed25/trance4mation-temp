"use client";
import "./App.css";
import "./index.css";
import CopyButton from "../../features/landing/components/Share";
import Modal from "../../features/landing/components/ShareModal";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const games = [
   { href: "/landing/game#Remembrance", name: "Remembrance"},
   { href: "/landing/game#Keep-It-Real-100", name: "Keep It Real 100"},
   { href: "/landing/game#Keep-It-Real", name: "Keep It Real"},
   { href: "/landing/game#Speak-to-me", name: "Speak to Me"},
   { href: "/landing/game#Home-is-the-Heart", name: "Home is the Heart"},
   { href: "/landing/game#Call-It-Out", name: "Call It Out Loud"},
   { href: "/landing/game#Trill", name: "Trill"},
]

export default function Layout({ children }: { children: React.ReactNode }) {
   /** navbar gradient when user scrolls */
   const nav = useRef<HTMLElement | null>(null);

   /** dropdown menu */
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const dropdownToggle = useRef<HTMLDivElement | null>(null);

   /** mobile menu */
   const [hamburgerOpen, setHamburgerOpen] = useState(false);
   const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen);

   /** share modal */
   const [isModalOpen, setModalOpen] = useState<boolean>(false);

   const handleCopyLink = () => {
      setModalOpen(true);
      navigator.clipboard.writeText(window.location.href).catch(console.error);
   };

   /** HARD reload login */
   const goToLogin = () => {
      window.location.href = "/login";
   };

   /** disable scroll when mobile menu open */
   useEffect(() => {
      if (hamburgerOpen) document.body.classList.add("no-scroll");
      else document.body.classList.remove("no-scroll");
      return () => document.body.classList.remove("no-scroll");
   }, [hamburgerOpen]);

   /** navbar scroll gradient */
   useEffect(() => {
      function handleScroll() {
         if (nav.current) {
            const scrollY = window.scrollY;
            const opacity = Math.min(scrollY / 350, 1);
            nav.current.style.backgroundImage = `linear-gradient(to bottom, var(--nav-bg), rgba(255,255,255,${opacity}))`;
         }
      }
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   /** close dropdown when clicking outside */
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
      <div className="App landing-navbar">
         {/* Overlay for mobile menu */}
         <div
            className={`overlay ${hamburgerOpen ? "open" : ""}`}
            onClick={toggleHamburger}></div>

         {/* DESKTOP NAVBAR */}
         <nav ref={nav} className={`nav ${hamburgerOpen ? "open" : ""}`}>
            <div className="nav-links">
               <Link href="/landing">Home</Link>

               {/* GAMES DROPDOWN */}
               <div
                  className={`dropdown ${dropdownOpen ? "open" : ""}` + " relative"}
                  ref={dropdownToggle}>
                  <a
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className="dropbtn">
                     Games
                  </a>

                  <div className="dropdown-content">
                     {games.map((game) => {
                        return (
                           <Link key={game.name} href={game.href}>{game.name}</Link>
                        )
                     })}
                  </div>
               </div>

               {/* About / Contact / FAQ */}
               <Link href="/landing/about">About Our Team</Link>
               <Link href="/landing/contact">Contact & Feedback</Link>
               <Link href="/landing/faq">FAQ</Link>

               <div className="nav-button-container">
                  {/* Share Button + Modal */}
                  <div className="share-container">
                     <CopyButton onClick={handleCopyLink} />
                     <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                  </div>

                  {/* LOGIN BUTTON (kept exactly as is) */}
                  <div className="login-wrapper">
                     <button onClick={goToLogin} className="landing-login-btn">
                        Login
                     </button>
                  </div>
               </div>
            </div>

            {/* HAMBURGER ICON */}
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

         {/* MOBILE DRAWER */}
         <div className={`side-drawer ${hamburgerOpen ? "open" : ""}`}>
            <div className="side-links">
               <Link href="/landing">Home</Link>

               {/* MOBILE DROPDOWN */}
               <div
                  className={`dropdown ${dropdownOpen ? "open" : ""}`}
                  ref={dropdownToggle}>
                  <a
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className="dropbtn">
                     Games
                  </a>

                  <div className="dropdown-mobile">
                     <div className="dropdown-content">
                        {games.map((game) => {
                           return (
                              <Link key={game.name} href={game.href}>{game.name}</Link>
                           )
                        })}
                     </div>
                  </div>
               </div>

               <Link href="/landing/about">About Our Team</Link>
               <Link href="/landing/contact">Contact & Feedback</Link>
               <Link href="/landing/faq">FAQ</Link>
               <div className="nav-button-container">
                  {/* Share Button */}
                  <div className="nav-button-container">
                     <CopyButton onClick={handleCopyLink} />
                     <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

                     {/* LOGIN BUTTON (MOBILE) */}
                     <button onClick={goToLogin} className="landing-login-btn">
                        Login
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <main>{children}</main>
      </div>
   );
}
