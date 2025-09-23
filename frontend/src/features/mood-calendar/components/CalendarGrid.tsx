"use client";
import type { MoodDay, MoodType } from "../types";
import { moodColors } from "../types";

const MOOD_EMOJIS: Record<MoodType, string> = {
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
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 text-center text-[10px] sm:text-xs md:text-sm font-medium text-ink/70">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 tracking-wide">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
        {days.map((d) => {
          const moodClass = d.mood ? moodColors[d.mood] : "bg-white border-ink/10";

          return (
            <button
              key={d.key}
              onClick={() => onPick(d.key)}
              className={[
                "aspect-square rounded-xl sm:rounded-2xl",
                "border p-1 sm:p-2 md:p-3 flex flex-col justify-between",
                "text-xs sm:text-sm md:text-base font-medium",
                "hover:shadow-md hover:-translate-y-[1px] transition",
                moodClass,
                d.isCurrentMonth ? "" : "opacity-50",
                d.isToday ? "ring-2 ring-teal" : "",
              ].join(" ")}
            >
              <span>{d.date.getDate()}</span>
              <span className="text-lg sm:text-2xl">
                {d.mood ? MOOD_EMOJIS[d.mood] : "—"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}