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
    <div className="rounded-3xl p-5 shadow-md border border-[#F58D6C]/40 bg-gradient-to-br from-[#FCE1D4]/90 to-[#FFF7E8]/90 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-[#F58D6C] mb-3">
        Quick Log – Today
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {MOODS.map((m) => (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium text-white shadow-md transition-all hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(135deg, #FBC4A6 0%, #F58D6C 100%)",
              boxShadow:
                "0 4px 12px rgba(245,141,108,0.3), inset 0 1px 4px rgba(255,255,255,0.4)",
            }}
          >
            <span>{m.emoji}</span> {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}