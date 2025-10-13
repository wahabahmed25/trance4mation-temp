"use client";
import type { MoodDay, MoodType } from "../types";
import { moodColors } from "../types";

const MOOD_EMOJIS: Record<MoodType, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😔",
  angry: "😠",
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
      <div className="mb-3 grid grid-cols-7 text-center text-xs uppercase tracking-wide text-white/60">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((d) => {
          const moodColor = d.mood ? moodColors[d.mood] : "";

          return (
            <button
              key={d.key}
              onClick={() => onPick(d.key)}
              disabled={!d.isCurrentMonth}
              className={[
                "relative h-24 rounded-2xl border border-white/10 bg-white/5 p-2 text-left outline-none transition",
                "hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30",
                !d.isCurrentMonth ? "opacity-30 cursor-not-allowed" : "",
                d.isToday ? "ring-2 ring-yellow-400" : "",
              ].join(" ")}
            >
              {/* Date number (always on top-right corner) */}
              <span className="absolute right-2 top-2 z-20 text-sm font-medium text-white/80">
                {d.date.getDate()}
              </span>

              {/* Mood chip / placeholder */}
              {d.mood ? (
                <span
                  className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: `${moodColor}22`,
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    boxShadow: `
                      0 0 6px ${moodColor},
                      0 0 12px ${moodColor}AA,
                      0 0 24px ${moodColor}88
                    `,
                  }}
                >
                  <span className="text-base">{MOOD_EMOJIS[d.mood]}</span>
                  <span className="hidden sm:inline text-white/90 capitalize">{d.mood}</span>
                </span>
              ) : (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-20">
                  —
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
