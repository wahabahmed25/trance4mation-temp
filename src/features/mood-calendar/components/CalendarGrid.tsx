"use client";
import type { MoodDay } from "../types";

const MOOD_EMOJIS: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  angry: "😡",
};

export function CalendarGrid({
  days,
  onPick,
}: {
  days: MoodDay[];
  onPick: (dateKey: string) => void;
}) {
  const WEEKDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 text-center text-xs text-gray-900">
        {WEEKDAYS.map((w) => <div key={w} className="py-1">{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <button
            key={d.key}
            onClick={() => onPick(d.key)}
            className={[
              "h-20 rounded-xl border p-2 text-left transition",
              d.isCurrentMonth ? "bg-blue-950" : "bg-blue-900 text-gray-400",
              d.isToday ? "ring-2 ring-pink-400" : "",
              "hover:bg-gray-100"
            ].join(" ")}
          >
            <div className="text-xs">{d.date.getDate()}</div>
            <div className="mt-2 text-center text-2xl">
              {d.mood ? MOOD_EMOJIS[d.mood] : "—"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}