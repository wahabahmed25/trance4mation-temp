"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthTransitionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ filter: "blur(15px)", scale: 1 }}
        animate={{ filter: "blur(0px)", scale: 1 }}
        exit={{ filter: "blur(18px)", scale: 1 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className=""
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
