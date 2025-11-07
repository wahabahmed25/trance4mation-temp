"use client";
import type { MoodType } from "../types";

const MOODS: { key: MoodType; label: string; emoji: string }[] = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "neutral", label: "Neutral", emoji: "😐" },
  { key: "sad", label: "Sad", emoji: "😔" },
  { key: "angry", label: "Angry", emoji: "😠" },
  { key: "calm", label: "Calm", emoji: "🕊️" },
  { key: "tired", label: "Tired", emoji: "😴" },
];

export function QuickLogCard({
  onSelect,
}: {
  onSelect: (mood: MoodType) => void;
}) {
  return (
    <div className="rounded-3xl p-5 shadow-md border border-[#DAD7FB]/60 bg-gradient-to-br from-[#F8F7FF]/90 to-[#FFFFFF]/90 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-[#3E386A] mb-3">
        Quick Log – Today
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {MOODS.map((m) => (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium text-[#2F2B55] shadow-sm transition-all duration-200 hover:scale-[1.04]"
            style={{
              background:
                "linear-gradient(135deg, #E9E7FF 0%, #F8F7FF 100%)",
              boxShadow:
                "inset 0 1px 3px rgba(255,255,255,0.5), 0 2px 8px rgba(183,178,245,0.25)",
              border: "1px solid rgba(200,195,250,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #E3E0FF 0%, #F4F3FF 100%)";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(190,185,255,0.35), inset 0 1px 4px rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #E9E7FF 0%, #F8F7FF 100%)";
              e.currentTarget.style.boxShadow =
                "inset 0 1px 3px rgba(255,255,255,0.5), 0 2px 8px rgba(183,178,245,0.25)";
            }}
          >
            <span>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
