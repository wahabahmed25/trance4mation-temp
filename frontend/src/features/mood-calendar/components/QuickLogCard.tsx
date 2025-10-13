"use client";

import type { MoodType } from "../types";
import { moodColors } from "../types";

const MOODS: { key: MoodType; label: string; emoji: string }[] = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "neutral", label: "Okay", emoji: "😐" },
  { key: "sad", label: "Down", emoji: "😔" },
  { key: "angry", label: "Frustrated", emoji: "😠" },
];

export function QuickLogCard({
  onSelect,
}: {
  onSelect: (mood: MoodType) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md transition hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Log – Today</h3>
      <p className="text-sm text-white/70 mb-5">How do you feel right now?</p>

      <div className="grid grid-cols-2 gap-3">
        {MOODS.map((m) => (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 hover:bg-white/20 active:scale-[0.97] transition"
            style={{
              boxShadow: `0 0 10px ${moodColors[m.key]}33`,
            }}
          >
            <span className="text-sm text-white">{m.label}</span>
            <span className="text-xl">{m.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}