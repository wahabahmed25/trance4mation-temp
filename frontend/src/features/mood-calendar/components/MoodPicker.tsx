"use client";
import { useState } from "react";
import type { MoodType } from "../types";
import { motion, AnimatePresence } from "framer-motion";

const MOODS: { key: MoodType; label: string; emoji: string; color: string }[] = [
  { key: "happy", label: "Happy", emoji: "😊", color: "#F4C95D" },
  { key: "neutral", label: "Neutral", emoji: "😐", color: "#7EC8E3" },
  { key: "sad", label: "Sad", emoji: "😔", color: "#A78BFA" },
  { key: "angry", label: "Angry", emoji: "😠", color: "#F6765E" },
  { key: "calm", label: "Calm", emoji: "🕊️", color: "#A3E4B3" },
  { key: "tired", label: "Tired", emoji: "😴", color: "#CFCFEA" },
];

export function MoodPicker({
  dateKey,
  onSelect,
  onClose,
}: {
  dateKey: string;
  onSelect: (mood: MoodType | null, note?: string) => void;
  onClose: () => void;
}) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-[#000]/40 backdrop-blur-sm">
      <div className="w-[min(92vw,500px)] rounded-3xl border border-[#FBD6C4]/50 bg-white/90 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#2C2C2C]">
            Log your mood – {dateKey}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-[#666] hover:bg-[#FDE7D8]"
          >
            ✕
          </button>
        </div>

        {/* Mood buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedMood(m.key)}
              className={`flex items-center justify-between rounded-2xl border border-[#FBD6C4]/50 bg-white/70 px-4 py-3 text-left transition-all hover:bg-[#FFF3E8] ${
                selectedMood === m.key ? "ring-2 ring-[#FCA17D]" : ""
              }`}
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

        {/* Reflection text */}
        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Why do you feel this way today?"
                className="w-full rounded-2xl border border-[#FBD6C4]/50 bg-white/70 px-4 py-3 text-sm text-[#2C2C2C] focus:ring-2 focus:ring-[#FCA17D] focus:outline-none placeholder:text-[#A88] resize-none"
                rows={3}
              />
              <p className="text-xs text-[#8B6F6A] mt-1 italic">
                (optional reflection)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save + Clear */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              if (!selectedMood) return;
              onSelect(selectedMood, note);
              onClose();
            }}
            disabled={!selectedMood}
            className="flex-1 rounded-2xl border border-[#FBD6C4]/50 bg-gradient-to-r from-[#FCA17D] to-[#F6765E] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            Save Mood
          </button>

          <button
            onClick={() => {
              setSelectedMood(null);
              setNote("");
              onSelect(null);
              onClose();
            }}
            className="flex-1 rounded-2xl border border-[#FBD6C4]/50 bg-white/70 px-4 py-2 text-sm text-[#555] hover:bg-[#FFF3E8]"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
