"use client";
import type { MoodType } from "../types";

const MOODS: { key: MoodType; label: string; emoji: string; color: string }[] = [
  { key: "happy",   label: "Happy",      emoji: "😊", color: "#F4C95D" }, // Golden Glow
  { key: "neutral", label: "Neutral",       emoji: "🙂", color: "#7EC8E3" }, // Sky Blue
  { key: "sad",     label: "Sad",       emoji: "😔", color: "#A78BFA" }, // Soft Violet
  { key: "angry",   label: "Angry", emoji: "😠", color: "#FF6F61" }, // Coral
];

export function MoodPicker({
  dateKey,
  onSelect,
  onClose,
}: {
  dateKey: string;
  onSelect: (mood: MoodType | null) => Promise<void> | void;  // ✅ allow null + async
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/60 backdrop-blur-sm">
      <div className="w-[min(92vw,520px)] rounded-3xl border border-white/10 bg-[#0C2F39] p-5 text-white shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Log mood – {dateKey}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-white/70 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Mood options */}
        <div className="grid grid-cols-2 gap-3">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={async () => {
                await onSelect(m.key);
                onClose();
              }}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>
                  {m.emoji}
                </span>
                {m.label}
              </span>
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: m.color }}
              />
            </button>
          ))}
        </div>

        {/* Clear option */}
        <button
          onClick={async () => {
            await onSelect(null);
            onClose();
          }}
          className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          Clear mood for this day
        </button>
      </div>
    </div>
  );
}
