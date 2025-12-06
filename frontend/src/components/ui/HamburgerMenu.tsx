import CopyButton from "@/features/landing/components/Share";
import Modal from "@/features/landing/components/ShareModal";
import { nav } from "framer-motion/client";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useState, useRef } from "react";

export function HamburgerMenu({items}: {items: Array<{href: Url, text: string}>}) {
    /** dropdown menu */
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = useRef<HTMLDivElement | null>(null);

    /** mobile menu */
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen);
    
    return (
        <>
            <Hamburger onClick={toggleHamburger}/>
            <SideDrawer items={items} isOpen={hamburgerOpen}/>
        </>
    );
}

function SideDrawer({items, isOpen}: {items: Array<{href: Url, text: string}>, isOpen: boolean}) {
    return (
        <div 
        className="px-4"
        style={{
            position: "fixed",
            top: 0,
            right: "100%",
            height: "100vh",
            fontSize: "1.5rem",
            backgroundColor: "#fff9f9",
            transform: `translateX(${isOpen ? 100 : 0}%)`,
            transition: "transform 0.3s ease-in-out",
            zIndex: 1000,
            paddingTop: "60px",
            overflowY: "auto",
        }}
        >
            {items.map((item) => <DrawerItem key={item.text} href={item.href} text={item.text}/>)}
        </div>
    )
}

function DrawerItem({href, text, underline}: {href: Url, text: string, underline?: boolean}) {
    return (
        <div 
        className="hover:bg-[#ff8661]/30"
        style={{
            height: "35px",
            color: "#042159",
            textDecoration: "none",
            fontSize: "1.4rem",
            padding: "1.8rem 2rem",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            letterSpacing: "1px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center"
        }}>
            <Link href={href}>
            {text}
            {underline ? <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#FF3B22] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/> : null}
            </Link>
        </div>
    )
}

function Hamburger({onClick}: {onClick: () => void}) {
    const [isOpen, setOpen] = useState<boolean>(false)
    const toggleHamburger = () => setOpen(!isOpen);

    return (
        <div 
        style={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "space-around",
            flexFlow: "column nowrap",
            zIndex: 10,
            cursor: "pointer"
        }}
        onClick={() => {
            toggleHamburger(); 
            onClick()
        }}
        >
            <BurgerLayer style={isOpen ? {transform: "rotate(45deg)"} : {}}/>
            <BurgerLayer style={isOpen ? {opacity: 0} : {}}/>
            <BurgerLayer style={isOpen ? {transform: "rotate(-45deg)"} : {}}/>
        </div>
    )
}

function BurgerLayer({style}: {style?: React.CSSProperties}) {
    return (
        <div style={{
            width: "2rem",
            height: "0.25rem",
            borderRadius: "8px",
            backgroundColor: "#042159",
            transformOrigin: "1px",
            transition: "all 0.3s linear",
            ...style
        }}>
            
        </div>
    )
}