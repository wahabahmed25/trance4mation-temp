"use client";
import { useState } from "react";
import type { MoodType } from "../types";
import { motion, AnimatePresence } from "framer-motion";

const MOODS: { key: MoodType; label: string; emoji: string; color: string }[] = [
  { key: "happy", label: "Happy", emoji: "😊", color: "#FFF6B0" },
  { key: "neutral", label: "Neutral", emoji: "😐", color: "#B5E3FA" },
  { key: "sad", label: "Sad", emoji: "😔", color: "#C8B8FA" },
  { key: "angry", label: "Angry", emoji: "😠", color: "#F1C3C7" },
  { key: "calm", label: "Calm", emoji: "🕊️", color: "#C9F2D7" },
  { key: "tired", label: "Tired", emoji: "😴", color: "#E2E2F7" },
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
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        className="w-[min(92vw,500px)] rounded-3xl border border-[#CFCBFA]/60 bg-gradient-to-br from-[#F5F3FF]/90 to-[#FFFFFF]/90 p-6 shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#3E386A]">
            Log your mood – {dateKey}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-[#5B558A] hover:bg-[#E9E7FF]/70 transition"
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
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200 backdrop-blur-sm
                ${
                  selectedMood === m.key
                    ? "ring-2 ring-[#B7B2F5] bg-gradient-to-r from-[#EAE8FF]/80 to-[#FFFFFF]/70"
                    : "bg-gradient-to-br from-[#F8F7FF]/80 to-[#FFFFFF]/90 hover:shadow-[0_0_8px_rgba(183,178,245,0.25)]"
                }
              `}
              style={{
                borderColor: "rgba(190,185,245,0.4)",
              }}
            >
              <span className="flex items-center gap-2 text-[#3E386A]">
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
                className="w-full rounded-2xl border border-[#CFCBFA]/60 bg-gradient-to-br from-[#F8F7FF]/90 to-[#FFFFFF]/90 px-4 py-3 text-sm text-[#3E386A] focus:ring-2 focus:ring-[#B7B2F5] focus:outline-none placeholder:text-[#8A86A8]/70 resize-none"
                rows={3}
              />
              <p className="text-xs text-[#7A7697] mt-1 italic">
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
            className="flex-1 rounded-2xl border border-[#CFCBFA]/60 bg-gradient-to-r from-[#C7C2FA] to-[#E9E6FF] px-4 py-2 text-sm font-medium text-[#2F2B55] shadow-md transition-all hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(183,178,245,0.35)] disabled:opacity-50"
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
            className="flex-1 rounded-2xl border border-[#CFCBFA]/50 bg-gradient-to-br from-[#FFFFFF]/90 to-[#F6F5FF]/90 px-4 py-2 text-sm text-[#3E386A] hover:bg-[#EEEAFE]/90"
          >
            Clear
          </button>
        </div>
      </motion.div>
    </div>
  );
}
