"use client";
import type { MoodType, NullableMood } from "../types";

const EMOJI: Record<MoodType, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  angry: "😡",
};

const COLORS: Record<MoodType, string> = {
  happy: "#F4C95D", // golden glow
  neutral: "#7EC8E3", // sky blue
  sad: "#A78BFA", // violet
  angry: "#FF6F61", // coral
};

export function SummarySidebar({
  moodsByDay,
  monthDate,
}: {
  moodsByDay: Record<string, NullableMood>;
  monthDate: Date;
}) {
  // count moods for current month
  const prefix = `${monthDate.getFullYear()}-${String(
    monthDate.getMonth() + 1
  ).padStart(2, "0")}-`;
  const keys = Object.keys(moodsByDay).filter((k) => k.startsWith(prefix));
  const counts: Record<MoodType, number> = {
    happy: 0,
    neutral: 0,
    sad: 0,
    angry: 0,
  };
  keys.forEach((k) => {
    const m = moodsByDay[k];
    if (m) counts[m]++;
  });

  return (
    <div>
      <p className="mt-1 text-sm text-white/70">
        {monthDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
      </p>

      <div className="mt-4 space-y-2">
        {Object.entries(counts).map(([mood, n]) => {
          const color = COLORS[mood as MoodType];
          return (
            <div
              key={mood}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <span className="flex items-center gap-2 capitalize text-white/90">
                <span className="text-xl">{EMOJI[mood as MoodType]}</span>
                {mood}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{
                  backgroundColor: `${color}22`,
                  boxShadow: `0 0 6px ${color}99, inset 0 0 6px ${color}66`,
                }}
              >
                {n}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80 backdrop-blur-md">
        Log once a day to unlock weekly insights and tips.
      </div>
    </div>
  );
}
