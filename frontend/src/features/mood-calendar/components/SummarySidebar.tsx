"use client";
import type { MoodEntry } from "../types";

const PALETTE = {
  coralLight: "#FCE1D4",
  coral: "#FCA17D",
  cream: "#FFF7E8",
  gold: "#FFD166",
};

export function SummarySidebar({
  moodsByDay,
  monthDate,
}: {
  moodsByDay: Record<string, MoodEntry>;
  monthDate: Date;
}) {
  // --- Count moods for the month ---
  const counts: Record<string, number> = {};
  Object.values(moodsByDay).forEach((entry) => {
    if (!entry?.mood) return;
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  // --- Collect reflections (only for current month) ---
  const reflections = Object.entries(moodsByDay)
    .filter(([_, e]) => e?.note && e.note.trim() !== "")
    .sort(([a], [b]) => (a > b ? -1 : 1)); // newest first

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 shadow-md border border-[#FCA17D]/40 backdrop-blur-md"
      style={{
        background: `linear-gradient(160deg, ${PALETTE.cream} 0%, ${PALETTE.coralLight} 65%, ${PALETTE.coral} 100%)`,
      }}
    >
      <h3 className="relative z-10 text-lg font-semibold text-[#F48C73] mb-3">
        This Month’s Summary 🌞
      </h3>

      {/* --- Mood Summary --- */}
      {Object.keys(counts).length === 0 ? (
        <p className="relative z-10 text-sm text-[#6C524C] italic">
          No moods logged yet — start tracking your journey!
        </p>
      ) : (
        <ul className="relative z-10 space-y-2 mt-2">
          {Object.entries(counts).map(([m, c]) => (
            <li
              key={m}
              className="flex justify-between items-center rounded-xl px-4 py-2 shadow-sm text-[#3C2F2F]"
              style={{
                background:
                  m === "happy"
                    ? "#FFF9E0"
                    : m === "neutral"
                    ? "#EAF7FF"
                    : m === "sad"
                    ? "#F4EFFF"
                    : m === "angry"
                    ? "#FFE9E5"
                    : m === "calm"
                    ? "#E5FFF2"
                    : m === "tired"
                    ? "#F1F1F7"
                    : "#FFF7EC",
              }}
            >
              <span className="capitalize font-medium">{m}</span>
              <span className="font-semibold">{c}</span>
            </li>
          ))}
        </ul>
      )}

      {/* --- Reflections Section --- */}
      {reflections.length > 0 && (
        <div className="relative z-10 mt-6 pt-4 border-t border-white/30">
          <h4 className="text-md font-semibold text-[#F48C73] mb-2">
            Your Reflections
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#FCA17D]/50">
            {reflections.map(([date, entry]) => {
              // ✅ Fix timezone shift (explicitly treat as local date)
              const [year, month, day] = date.split("-");
              const displayDate = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
              );

              const formattedDate = displayDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={date}
                  className="rounded-2xl bg-white/70 p-3 shadow-sm border border-[#FCA17D]/30 backdrop-blur-sm"
                >
                  <p className="text-xs text-[#8B6F6A] mb-1 font-medium">
                    {formattedDate}
                    {entry.mood && (
                      <span className="ml-2 capitalize text-[#F48C73] font-semibold">
                        {entry.mood}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-[#3C2F2F] leading-snug">
                    {entry.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {total > 0 && (
        <p className="relative z-10 mt-5 text-sm text-[#6C524C] font-medium">
          Logged moods:{" "}
          <span className="text-[#F48C73] font-bold">{total}</span>
        </p>
      )}
    </div>
  );
}