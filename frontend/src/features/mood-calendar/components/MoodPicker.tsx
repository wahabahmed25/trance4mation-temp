"use client";
import type { MoodType } from "../types";

const MOODS: { key: MoodType; label: string; emoji: string }[] = [
  { key: "happy",   label: "Happy",   emoji: "😊" },
  { key: "neutral", label: "Okay",    emoji: "😐" },
  { key: "sad",     label: "Down",    emoji: "😢" },
  { key: "angry",   label: "Frustrated", emoji: "😡" },
];

export function MoodPicker({
  dateKey,
  onSelect,
  onClose
}: {
  dateKey: string;
  onSelect: (mood: MoodType) => void;
  onClose: () => void;
}) { //line 22 log mood bar customization
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border bg-red-400 p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Log mood – {dateKey}</h3> 
          <button className="rounded-lg px-2 py-1 text-sm hover:bg-gray-100" onClick={onClose}>✕</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => onSelect(m.key)}
              className="flex items-center justify-between rounded-xl border px-3 py-2 hover:bg-white"
            >
              <span>{m.label}</span>
              <span className="text-2xl">{m.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}