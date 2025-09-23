"use client";
import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarGrid } from "./components/CalendarGrid";
import { MoodPicker } from "./components/MoodPicker";
import { SummarySidebar } from "./components/SummarySidebar";
import { ReminderToast } from "./components/ReminderToast";
import { generateMonthDays } from "./utils/calendar";
import type { MoodType } from "./types";

export default function MoodCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moodsByDay, setMoodsByDay] = useState<Record<string, MoodType | null>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handlePick(dateKey: string) {
    setSelectedDate(dateKey);
  }

  function handleSelectMood(mood: MoodType) {
    if (!selectedDate) return;
    setMoodsByDay((prev) => ({ ...prev, [selectedDate]: mood }));
    setSelectedDate(null);
  }

  const days = generateMonthDays(currentMonth, moodsByDay);

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-paper to-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-teal sm:text-4xl">
            Mood Calendar
          </h1>
          <p className="text-sm text-brand-ink/70">
            Track your daily emotions and see your growth journey.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-brand-teal/20 px-3 py-1.5 text-sm text-brand-teal hover:bg-brand-teal/10 transition"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            ◀ Prev
          </button>
          <div className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-brand-ink shadow-card">
            {currentMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}
          </div>
          <button
            className="rounded-lg border border-brand-teal/20 px-3 py-1.5 text-sm text-brand-teal hover:bg-brand-teal/10 transition"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            Next ▶
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-1 rounded-2xl border border-brand-ink/10 bg-white p-4 shadow-card hover:shadow-hover transition">
          <CalendarGrid days={days} onPick={handlePick} />
        </section>

        <aside className="lg:w-80">
          <div
            className="mb-2 flex cursor-pointer items-center justify-between lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <h3 className="text-lg font-bold text-brand-teal">This Month</h3>
            <span className="text-sm text-brand-ink/70">{sidebarOpen ? "▴" : "▾"}</span>
          </div>
          {sidebarOpen && (
            <div className="rounded-2xl border border-brand-ink/10 bg-white p-4 shadow-card hover:shadow-hover transition">
              <SummarySidebar moodsByDay={moodsByDay} monthDate={currentMonth} />
            </div>
          )}
        </aside>
      </div>

      {/* Mood Picker */}
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