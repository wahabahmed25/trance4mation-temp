"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarGrid } from "./components/CalendarGrid";
import { MoodPicker } from "./components/MoodPicker";
import { SummarySidebar } from "./components/SummarySidebar";
import { ReminderToast } from "./components/ReminderToast";
import { QuickLogCard } from "./components/QuickLogCard";
import { generateMonthDays } from "./utils/calendar";
import type { MoodType, NullableMood } from "@/features/mood-calendar/types";
import BackgroundElements from "@/components/ui/BackgroundElements";

export default function MoodCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moodsByDay, setMoodsByDay] = useState<Record<string, NullableMood>>({});

  // Load moods from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("moodsByDay");
    if (saved) setMoodsByDay(JSON.parse(saved));
  }, []);

  // Persist moods locally
  useEffect(() => {
    localStorage.setItem("moodsByDay", JSON.stringify(moodsByDay));
  }, [moodsByDay]);

  const handlePick = (dateKey: string) => setSelectedDate(dateKey);

  const handleSelectMood = (mood: NullableMood) => {
    if (!selectedDate) return;
    setMoodsByDay((prev) => ({ ...prev, [selectedDate]: mood }));
    setSelectedDate(null);
  };

  const days = generateMonthDays(currentMonth, moodsByDay);

  return (
    <main
      className="relative min-h-[90vh] flex flex-col items-center justify-start px-4 py-12 md:px-8 text-[#3C2F2F] overflow-hidden"
    >
      <BackgroundElements />

      {/* === Outer Framed Container === */}
      <div
        className="
          relative w-full max-w-7xl rounded-[2rem] border 
          border-[#FCA17D]/40 bg-white/60 backdrop-blur-md 
          shadow-[0_0_30px_rgba(252,161,125,0.15)] 
          ring-1 ring-white/40
          overflow-hidden
          transition-all duration-300
        "
      >
        {/* Subtle inner coral gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 0%, rgba(252,161,125,0.08), transparent 70%)",
          }}
        />

        {/* ===== Header ===== */}
        <header className="relative z-10 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-8 pt-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#F6765E] drop-shadow-sm">
              Mood Calendar
            </h1>
            <p className="text-sm text-[#7C6A65] mt-1">
              Track your daily emotions and celebrate progress 🌤️
            </p>
          </div>

          {/* Month Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 shadow-inner border border-[#FCA17D]/40 backdrop-blur-sm">
              {/* Coral Prev Button */}
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="flex items-center justify-center rounded-xl px-4 py-2 text-white font-medium shadow-md transition-all hover:scale-[1.05]"
                style={{
                  background:
                    "linear-gradient(135deg, #FCA17D 0%, #F6765E 100%)",
                  boxShadow:
                    "inset 0 1px 4px rgba(255,255,255,0.4), 0 4px 12px rgba(246,118,94,0.35)",
                }}
              >
                ◀ Prev
              </button>

              {/* Month Label */}
              <span className="px-3 py-1 text-lg font-semibold text-[#3C2F2F]">
                {currentMonth.toLocaleString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              {/* Coral Next Button */}
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="flex items-center justify-center rounded-xl px-4 py-2 text-white font-medium shadow-md transition-all hover:scale-[1.05]"
                style={{
                  background:
                    "linear-gradient(135deg, #FCA17D 0%, #F6765E 100%)",
                  boxShadow:
                    "inset 0 1px 4px rgba(255,255,255,0.4), 0 4px 12px rgba(246,118,94,0.35)",
                }}
              >
                Next ▶
              </button>
            </div>
          </div>
        </header>

        {/* ===== Main Layout ===== */}
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row px-8 pb-10">
          {/* Calendar Section */}
          <section className="flex-1 rounded-3xl bg-white/75 p-6 shadow-inner border border-[#FCA17D]/30 backdrop-blur-md transition-all hover:shadow-lg">
            <CalendarGrid days={days} onPick={handlePick} />
          </section>

          {/* Sidebar Section */}
          <aside className="lg:w-80 flex flex-col gap-6">
            <QuickLogCard
              onSelect={(mood) => {
                const today = new Date().toLocaleDateString("en-CA", {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                });
                setMoodsByDay((prev) => ({ ...prev, [today]: mood }));
              }}
            />
            <SummarySidebar
              moodsByDay={moodsByDay}
              monthDate={currentMonth}
            />
          </aside>
        </div>
      </div>

      {/* Mood Picker Modal */}
      {selectedDate && (
        <MoodPicker
          dateKey={selectedDate}
          onSelect={handleSelectMood}
          onClose={() => setSelectedDate(null)}
        />
      )}

      <ReminderToast />
    </main>
  );
}
