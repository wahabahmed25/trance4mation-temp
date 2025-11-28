"use client"
import HomeLayout from "@/features/home/HomeLayout";
import { Calendar, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "Mood Calendar", 
    icon: <Calendar size={16}/>, 
    href: "/mood-calendar",
    description: "Log your mood every day to see trends over time and monthly mood summaries.",
    linkText: "Try now →"
  },
  {
    name: "Social Feed", 
    icon: <Users size={16}/>, 
    href: "/social",
    description: "Share how you're feeling with the community. Reflect on yourself by answering daily prompts, and show support to your friends.",
    linkText: "Try now →"
  },
  {
    name: "Discussion Circle", 
    icon: <MessageCircle size={16}/>,
    href: "/discussion-circle",
    description: "Play a game where you and other players take turns responding to prompts about school, identity, and more.",
    linkText: "Coming soon",
    disabled: true
  }
]

export default function Features() {
  return (
    <HomeLayout>
      <div className="mt-10 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#5b528a] tracking-tight drop-shadow-sm">
              Features
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Things to do on the platform
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          {features.map((feature) => {
            return (
              <div 
              key={feature.name}
              className="w-full h-full rounded-3xl 
              bg-white/80 backdrop-blur-xl 
              border border-[rgba(0,0,0,0.05)]
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              py-4 px-6 flex flex-col gap-2"
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2 text-[#5b528a] font-bold text-xl drop-shadow-sm">
                    {feature.icon} {feature.name}
                  </div>
                  <Link
                    href={feature.href}
                    className="text-[#5b528a]/80 hover:text-[#5b528a] border border-[#5b528a]/20 rounded-xl px-4 py-1.5 text-sm transition backdrop-blur-sm bg-white/50"
                    onClick={(e) => feature.disabled && e.preventDefault()}
                    style={feature.disabled ? {cursor: "default"} : {}}
                  >
                    {feature.linkText}
                  </Link>
                </div>

                <div className="text-[#333]/75">
                  {feature.description}
                </div>
              </div>
            )
          })}
        </div>
        {/* 
        <div className="flex gap-3 mt-10 items-start">

          <Link
            href="/mood-calendar"
            className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
            text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
            transition-all text-sm flex items-center gap-1"
          >
            <Calendar size={16} /> Mood
          </Link>

          <Link
            href="/social"
            className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
            text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
            transition-all text-sm flex items-center gap-1"
          >
            <Users size={16} /> Social
          </Link>

          <div className="relative flex flex-col items-center">
            <Link
              href="/coming-soon"
              className="rounded-full border border-[#000]/10 bg-white/60 px-4 py-1.5
                text-[#444] hover:border-[#5b528a] hover:text-[#5b528a]
                transition-all text-sm flex items-center gap-1"
            >
              <MessageCircle size={16} /> Circle
            </Link>

            <span className="absolute top-full mt-1 text-[10px] text-gray-400">
              Coming soon
            </span>
          </div>
        </div> */}
      </div>
    </HomeLayout>
  );
}
