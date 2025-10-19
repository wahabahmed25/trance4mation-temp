"use client";
import type { MoodType } from "../types";

const MOODS: { key: MoodType; label: string; emoji: string; color: string }[] = [
  { key: "happy", label: "Happy", emoji: "😊", color: "#F4C95D" },
  { key: "neutral", label: "Neutral", emoji: "😐", color: "#7EC8E3" },
  { key: "sad", label: "Sad", emoji: "😔", color: "#A78BFA" },
  { key: "angry", label: "Angry", emoji: "😠", color: "#F6765E" },
];

export function MoodPicker({
  dateKey,
  onSelect,
  onClose,
}: {
  dateKey: string;
  onSelect: (mood: MoodType | null) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-[#000]/40 backdrop-blur-sm">
      <div className="w-[min(92vw,480px)] rounded-3xl border border-[#FBD6C4]/50 bg-white/90 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#2C2C2C]">
            Log mood – {dateKey}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-[#666] hover:bg-[#FDE7D8]"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                onSelect(m.key);
                onClose();
              }}
              className="flex items-center justify-between rounded-2xl border border-[#FBD6C4]/50 bg-white/70 px-4 py-3 text-left transition hover:bg-[#FFF3E8]"
            >
              <span className="flex items-center gap-2 text-[#2C2C2C]">
                <span className="text-xl">{m.emoji}</span>
                {m.label}
              </span>
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: m.color }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onSelect(null);
            onClose();
          }}
          className="mt-5 w-full rounded-2xl border border-[#FBD6C4]/50 bg-white/70 px-4 py-2 text-sm text-[#555] hover:bg-[#FFF3E8]"
        >
          Clear mood for this day
        </button>
      </div>
    </div>
  );
}
