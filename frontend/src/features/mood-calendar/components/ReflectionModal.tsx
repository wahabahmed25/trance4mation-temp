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

export function ReflectionModal({
  dateKey,
  entry,
  onEdit,
  onClear,
  onClose,
}: Props) {
  if (!entry.mood) return null;

  const colorClass = moodColors[entry.mood] || "bg-white";

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`w-[min(90vw,480px)] rounded-3xl border border-[#CFCBFA]/60 ${colorClass} bg-gradient-to-br from-[#F8F7FF]/90 to-[#FFFFFF]/90 p-6 shadow-2xl backdrop-blur-xl`}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#3E386A]">
            {dateKey} — {entry.mood.toUpperCase()}
          </h3>
          <button
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-[#5B558A] hover:bg-[#EAE8FF]/70 transition"
          >
            ✕
          </button>
        </header>

        {/* Reflection Text */}
        <p className="text-sm text-[#3E386A] leading-relaxed whitespace-pre-wrap bg-transparent">
          {entry.note && entry.note.trim().length > 0
            ? entry.note
            : "No reflection was written for this day."}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onEdit}
            className="flex-1 rounded-2xl border border-[#CFCBFA]/60 bg-gradient-to-r from-[#C7C2FA] to-[#E9E6FF] px-4 py-2 text-sm font-medium text-[#2F2B55] shadow-md transition-all hover:scale-[1.02] hover:shadow-[0_0_10px_rgba(183,178,245,0.35)]"
          >
            Edit
          </button>

          <button
            onClick={onClear}
            className="flex-1 rounded-2xl border border-[#CFCBFA]/60 bg-gradient-to-br from-[#FFFFFF]/90 to-[#F6F5FF]/90 px-4 py-2 text-sm text-[#3E386A] hover:bg-[#EEEAFE]/90"
          >
            Clear
          </button>
        </div>
      </motion.div>
    </div>
  );
}
