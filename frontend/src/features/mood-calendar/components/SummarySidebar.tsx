"use client";
import type { MoodEntry } from "../types";

const PALETTE = {
  skyLight: "#F4F9FF",
  skySoft: "#EAF3FF",
  white: "#FFFFFF",
  blueAccent: "#CFE6FF",
};

export function SummarySidebar({
  moodsByDay,
  monthDate,
}: {
  moodsByDay: Record<string, MoodEntry>;
  monthDate: Date;
}) {
  const counts: Record<string, number> = {};
  Object.values(moodsByDay).forEach((entry) => {
    if (!entry?.mood) return;
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const reflections = Object.entries(moodsByDay)
    .filter(([_, e]) => e?.note && e.note.trim() !== "")
    .sort(([a], [b]) => (a > b ? -1 : 1));

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 shadow-md border border-[#D6E4F5]/50 backdrop-blur-md"
      style={{
        background: `linear-gradient(160deg, ${PALETTE.white} 0%, ${PALETTE.skySoft} 70%, ${PALETTE.skyLight} 100%)`,
      }}
    >
      <h3 className="relative z-10 text-lg font-semibold text-[#1E1E1E] mb-3">
        This Month’s Summary ☁️
      </h3>

      {Object.keys(counts).length === 0 ? (
        <p className="relative z-10 text-sm text-[#5B7083] italic">
          No moods logged yet — start tracking your journey!
        </p>
      ) : (
        <ul className="relative z-10 space-y-2 mt-2">
          {Object.entries(counts).map(([m, c]) => (
            <li
              key={m}
              className="flex justify-between items-center rounded-xl px-4 py-2 shadow-sm text-[#1E1E1E]"
              style={{
                background:
                  m === "happy"
                    ? "#F9FCFF"
                    : m === "neutral"
                    ? "#EFF7FF"
                    : m === "sad"
                    ? "#F4F7FF"
                    : m === "angry"
                    ? "#FFF0F0"
                    : m === "calm"
                    ? "#F3FFF9"
                    : m === "tired"
                    ? "#F7F7FA"
                    : "#FFFFFF",
              }}
            >
              <span className="capitalize font-medium">{m}</span>
              <span className="font-semibold">{c}</span>
            </li>
          ))}
        </ul>
      )}

      {reflections.length > 0 && (
        <div className="relative z-10 mt-6 pt-4 border-t border-white/30">
          <h4 className="text-md font-semibold text-[#1E1E1E] mb-2">
            Your Reflections
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#CFE6FF]/70">
            {reflections.map(([date, entry]) => {
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
                  className="rounded-2xl bg-white/80 p-3 shadow-sm border border-[#D6E4F5]/40 backdrop-blur-sm"
                >
                  <p className="text-xs text-[#5B7083] mb-1 font-medium">
                    {formattedDate}
                    {entry.mood && (
                      <span className="ml-2 capitalize text-[#1E1E1E] font-semibold">
                        {entry.mood}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-[#1E1E1E] leading-snug">
                    {entry.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {total > 0 && (
        <p className="relative z-10 mt-5 text-sm text-[#5B7083] font-medium">
          Logged moods:{" "}
          <span className="text-[#1E1E1E] font-bold">{total}</span>
        </p>
      )}
    </div>
  );
}
