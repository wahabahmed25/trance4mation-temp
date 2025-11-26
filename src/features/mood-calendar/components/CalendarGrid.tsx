"use client";
import type { MoodDay, MoodType } from "../types";
import { moodColors } from "../types";

const MOOD_EMOJIS: Record<MoodType, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😔",
  angry: "😠",
  calm: "🕊️",
  tired: "😴",
};

// 🌀 Softer pastel gradients for each mood (fits the lavender-sky palette)
const moodGradients: Record<MoodType, string> = {
  happy: "linear-gradient(135deg, #FFF7C2 0%, #F5F4FF 100%)",
  neutral: "linear-gradient(135deg, #D1EFFF 0%, #F7FBFF 100%)",
  sad: "linear-gradient(135deg, #D7D2FF 0%, #F3F1FF 100%)",
  angry: "linear-gradient(135deg, #F4D1D8 0%, #FAE7ED 100%)",
  calm: "linear-gradient(135deg, #DDF9E6 0%, #F4FFF8 100%)",
  tired: "linear-gradient(135deg, #E9E8F9 0%, #F9F8FF 100%)",
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
      {/* Weekday Header */}
      <div className="mb-3 grid grid-cols-7 text-center text-xs uppercase tracking-wide text-[#4C4A61]/70">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((d) => {
          const mood = d.mood as MoodType | null;
          const baseColor = mood ? moodColors[mood] : "#E5E4FA";

          // Subtle lavender–sky blend for default cells
          const defaultBg = `
            linear-gradient(
              135deg,
              rgba(193, 230, 255, 0.55) 0%,
              rgba(245, 244, 255, 0.8) 50%,
              rgba(255,255,255,0.9) 100%
            )`;

          return (
            <button
              key={d.key}
              onClick={() => onPick(d.key)}
              disabled={!d.isCurrentMonth}
              className={[
                "relative h-24 rounded-2xl border backdrop-blur-md p-2 transition-all duration-300",
                "hover:shadow-[0_0_12px_rgba(157,140,255,0.2)] hover:-translate-y-[1px]",
                d.isToday ? "ring-2 ring-[#BFD8FF]" : "",
                !d.isCurrentMonth ? "opacity-25 cursor-not-allowed" : "",
              ].join(" ")}
              style={{
                borderColor: "rgba(190,190,255,0.35)",
                background: mood ? moodGradients[mood] : defaultBg,
                boxShadow: mood
                  ? `0 0 12px ${baseColor}55, inset 0 1px 3px rgba(255,255,255,0.4)`
                  : "inset 0 1px 4px rgba(255,255,255,0.5)",
              }}
            >
              {/* Date Number */}
              <span className="absolute right-2 top-2 text-sm font-medium text-[#4C4A61]/80">
                {d.date.getDate()}
              </span>

              {/* Mood Display */}
              {mood ? (
                <div
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-[#2C2C2C] shadow-md hover:scale-[1.03] transition-transform duration-200"
                  style={{
                    background: moodGradients[mood],
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: `0 0 10px ${baseColor}40, inset 0 1px 4px rgba(255,255,255,0.3)`,
                  }}
                >
                  <span className="text-base drop-shadow-sm">{MOOD_EMOJIS[mood]}</span>
                  <span className="capitalize tracking-wide">{mood}</span>
                </div>
              ) : (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-10 text-[#4C4A61]">
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
