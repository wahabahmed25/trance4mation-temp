"use client";
import type { NullableMood } from "../types";

const PALETTE = {
  coralLight: "#FDE7D8",
  coral: "#FCA17D",
  cream: "#FFF7E8",
  gold: "#FFD166",
};

export function SummarySidebar({
  moodsByDay,
  monthDate,
}: {
  moodsByDay: Record<string, NullableMood>;
  monthDate: Date;
}) {
  const counts: Record<string, number> = {};
  Object.values(moodsByDay).forEach((m) => {
    if (!m) return;
    counts[m] = (counts[m] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 shadow-md border border-[#FCA17D]/40 backdrop-blur-md"
      style={{
        background: `linear-gradient(160deg, ${PALETTE.cream} 0%, ${PALETTE.coralLight} 65%, ${PALETTE.coral} 100%)`,
      }}
    >
      <h3 className="relative z-10 text-lg font-semibold text-[#F6765E] mb-3">
        This Month’s Summary 🌞
      </h3>

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
                    : "#FFF7EC",
              }}
            >
              <span className="capitalize font-medium">{m}</span>
              <span className="font-semibold">{c}</span>
            </li>
          ))}
        </ul>
      )}

      {total > 0 && (
        <p className="relative z-10 mt-5 text-sm text-[#6C524C] font-medium">
          Logged moods:{" "}
          <span className="text-[#F6765E] font-bold">{total}</span>
        </p>
      )}
    </div>
  );
}
