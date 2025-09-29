"use client";
import type { MoodType } from "../types";

const MOODS: { key: MoodType; label: string; emoji: string; bg: string; text: string }[] = [
  { key: "happy",   label: "Happy",      emoji: "😊", bg: "bg-sunshine/60", text: "text-ink" },
  { key: "neutral", label: "Okay",       emoji: "😐", bg: "bg-sky/40",      text: "text-ink" },
  { key: "sad",     label: "Down",       emoji: "😢", bg: "bg-violet/40",   text: "text-white" },
  { key: "angry",   label: "Frustrated", emoji: "😡", bg: "bg-peach/60",    text: "text-white" },
];

export function MoodPicker({
  dateKey,
  onSelect,
  onClose,
}: {
  dateKey: string;
  onSelect: (mood: MoodType) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="w-full rounded-t-2xl border border-ink/10 bg-white p-5 shadow-xl sm:max-w-sm sm:rounded-2xl sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-teal">
            Log mood – {dateKey}
          </h3>
          <button
            className="rounded-lg px-2 py-1 text-sm text-ink/70 hover:bg-paper"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => onSelect(m.key)}
              className={`
                flex items-center justify-between 
                rounded-xl border border-ink/10 
                px-4 py-3 hover:shadow-md active:scale-[0.98]
                ${m.bg} ${m.text}
              `}
            >
              <span className="text-sm sm:text-base">{m.label}</span>
              <span className="text-xl sm:text-2xl">{m.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}