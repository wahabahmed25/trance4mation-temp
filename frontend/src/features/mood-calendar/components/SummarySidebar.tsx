"use client";
import type { MoodType } from "../types";

const EMOJI: Record<MoodType, string> = {
  happy: "😊", neutral: "😐", sad: "😢", angry: "😡"
};

export function SummarySidebar({
  moodsByDay,
  monthDate
}: {
  moodsByDay: Record<string, MoodType | null>;
  monthDate: Date;
}) {
  const keys = Object.keys(moodsByDay).filter(k => k.startsWith(
    `${monthDate.getFullYear()}-${String(monthDate.getMonth()+1).padStart(2,"0")}-`
  ));
  const counts: Record<MoodType, number> = { happy:0, neutral:0, sad:0, angry:0 };
  keys.forEach(k => { const m = moodsByDay[k]; if (m) counts[m]++; });

  return (
    <div>
      <h3 className="text-lg font-semibold text-pink-white">Current Month</h3>
      <p className="mt-1 text-sm text-gray-900">
        {monthDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
      </p>

      <div className="mt-4 space-y-2">
        {Object.entries(counts).map(([mood, n]) => (
          <div key={mood} className="flex items-center justify-between rounded-xl border p-2 text-white-950">
            <span className="flex items-center gap-2 capitalize">
              <span className="text-xl">{EMOJI[mood as keyof typeof EMOJI]}</span>
              {mood}
            </span>
            <span className="text-sm text-gray-700">{n}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border bg-red-50 p-3 text-sm text-red-800">
        Log once a day to unlock weekly insights and tips.
      </div>
    </div>
  );

}

// line 40 -> box of comment in the sidebar