"use client";

import { motion } from "framer-motion";
import type { MoodEntry } from "../types";
import { moodColors } from "../types";

interface Props {
  dateKey: string;
  entry: MoodEntry;
  onEdit: () => void;
  onClear: () => void;
  onClose: () => void;
}

export function ReflectionModal({ dateKey, entry, onEdit, onClear, onClose }: Props) {
  if (!entry.mood) return null;

  const colorClass = moodColors[entry.mood] || "bg-white";

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-[min(90vw,480px)] rounded-3xl border border-[#FBD6C4]/50 ${colorClass} bg-white/80 p-6 shadow-2xl`}
      >
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2C2C2C]">
            {dateKey} — {entry.mood.toUpperCase()}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-[#666] hover:bg-[#FDE7D8]"
          >
            ✕
          </button>
        </header>

        <p className="text-sm text-[#3C2F2F] leading-relaxed whitespace-pre-wrap">
          {entry.note && entry.note.trim().length > 0
            ? entry.note
            : "No reflection was written for this day."}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onEdit}
            className="flex-1 rounded-2xl border border-[#FBD6C4]/50 bg-gradient-to-r from-[#FCA17D] to-[#F6765E] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:scale-[1.02]"
          >
            Edit
          </button>
          <button
            onClick={onClear}
            className="flex-1 rounded-2xl border border-[#FBD6C4]/50 bg-white/70 px-4 py-2 text-sm text-[#555] hover:bg-[#FFF3E8]"
          >
            Clear
          </button>
        </div>
      </motion.div>
    </div>
  );
}