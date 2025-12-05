import CopyButton from "@/features/landing/components/Share";
import Modal from "@/features/landing/components/ShareModal";
import { nav } from "framer-motion/client";
import { Link } from "lucide-react";
import { useState, useRef } from "react";

export function HamburgerMenu() {
    /** dropdown menu */
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = useRef<HTMLDivElement | null>(null);

    /** mobile menu */
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen);
    
    return (
        <div className={`hamburger-mobile ${hamburgerOpen ? "open" : ""}`} onClick={toggleHamburger}>
            <HamburgerContainer>
                <Burger/>
                <Burger/>
                <Burger/>
            </HamburgerContainer>
        </div>
    );
}

function HamburgerContainer({children}: {children: React.ReactNode}) {
    return (
        <div style={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "space-around",
            flexFlow: "column nowrap",
            zIndex: 10
        }}>
            {children}
        </div>
    )
}

function Burger() {
    return (
        <div style={{
            width: "2rem",
            height: "0.25rem",
            borderRadius: "8px",
            backgroundColor: "var(--text-primary)",
            transformOrigin: "1px",
            transition: "all 0.3s linear"
        }}>
            
        </div>
    )
}