"use client";
import type { MoodType } from "../types";

const EMOJI: Record<MoodType, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  angry: "😡",
};

const CHIP: Record<MoodType, string> = {
  happy: "bg-sunshine/60 text-ink",
  neutral: "bg-sky/50 text-ink",
  sad: "bg-violet/50 text-white",
  angry: "bg-peach/60 text-white",
};

export function SummarySidebar({
  moodsByDay,
  monthDate,
}: {
  moodsByDay: Record<string, MoodType | null>;
  monthDate: Date;
}) {
  // count moods for current month
  const prefix = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}-`;
  const keys = Object.keys(moodsByDay).filter((k) => k.startsWith(prefix));
  const counts: Record<MoodType, number> = { happy: 0, neutral: 0, sad: 0, angry: 0 };
  keys.forEach((k) => {
    const m = moodsByDay[k];
    if (m) counts[m]++;
  });

  return (
    <div>
      <h3 className="text-lg font-bold text-teal">This Month</h3>
      <p className="mt-1 text-sm text-ink/70">
        {monthDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
      </p>

      <div className="mt-4 space-y-2">
        {Object.entries(counts).map(([mood, n]) => (
          <div
            key={mood}
            className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-3 shadow-card"
          >
            <span className="flex items-center gap-2 capitalize">
              <span className="text-xl">{EMOJI[mood as MoodType]}</span>
              {mood}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${CHIP[mood as MoodType]}`}
            >
              {n}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-teal/20 bg-teal/10 p-3 text-sm text-teal">
        Log once a day to unlock weekly insights and gentle tips.
      </div>
    </div>
  );
}
