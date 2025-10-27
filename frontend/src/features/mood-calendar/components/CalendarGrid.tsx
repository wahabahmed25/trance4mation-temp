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

// 🌀 Gradient background for each mood
const moodGradients: Record<MoodType, string> = {
  happy: "linear-gradient(135deg, #FFD166 0%, #FCA17D 100%)", // gold-coral
  neutral: "linear-gradient(135deg, #7EC8E3 0%, #AEE5F8 100%)", // sky blue
  sad: "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)", // violet
  angry: "linear-gradient(135deg, #F6765E 0%, #FCA17D 100%)", // coral
  calm: "linear-gradient(135deg, #A3E4B3 0%, #D0F0D0 100%)", // mint green 🌿
  tired: "linear-gradient(135deg, #CFCFEA 0%, #E4E4F8 100%)", // lavender gray 😴
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
      <div className="mb-3 grid grid-cols-7 text-center text-xs uppercase tracking-wide text-[#A66B5D]/80">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((d) => {
          const mood = d.mood as MoodType | null;
          const baseColor = mood ? moodColors[mood] : "#FDE7D8";

          return (
            <button
              key={d.key}
              onClick={() => onPick(d.key)}
              disabled={!d.isCurrentMonth}
              className={[
                "relative h-24 rounded-2xl border border-[#FBD6C4]/60 bg-[#FFF7E8]/80 p-2 transition-all duration-200",
                "hover:shadow-md hover:-translate-y-[1px]",
                d.isToday ? "ring-2 ring-[#FFD166]" : "",
                !d.isCurrentMonth ? "opacity-25 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {/* Date Number */}
              <span className="absolute right-2 top-2 text-sm font-medium text-[#A66B5D]/80">
                {d.date.getDate()}
              </span>

              {/* Mood Display */}
              {mood ? (
                <div
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md hover:scale-[1.03] transition-transform duration-200"
                  style={{
                    background: moodGradients[mood],
                    boxShadow: `0 0 10px ${baseColor}55, inset 0 1px 4px rgba(255,255,255,0.4)`,
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <span className="text-base drop-shadow-sm">
                    {MOOD_EMOJIS[mood]}
                  </span>
                  <span className="capitalize tracking-wide">{mood}</span>
                </div>
              ) : (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-10 text-[#A66B5D]">
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
