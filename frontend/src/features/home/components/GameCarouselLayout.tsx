"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GameCarouselLayoutProps {
  title: string;
  children: React.ReactNode; // The cards
}

const GameCarouselLayout: React.FC<GameCarouselLayoutProps> = ({
  title,
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0F4C5C]">{title}</h2>

        <div className="flex gap-3">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-white/70 border border-gray-200 shadow hover:bg-white transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-white/70 border border-gray-200 shadow hover:bg-white transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {children}
      </div>
    </section>
  );
};

export default GameCarouselLayout;
