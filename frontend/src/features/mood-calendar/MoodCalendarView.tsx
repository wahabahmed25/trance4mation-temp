"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarGrid } from "./components/CalendarGrid";
import { MoodPicker } from "./components/MoodPicker";
import { SummarySidebar } from "./components/SummarySidebar";
import { ReminderToast } from "./components/ReminderToast";
import { generateMonthDays } from "./utils/calendar";
import type { MoodType, NullableMood } from "@/features/mood-calendar/types";
import { saveMood, loadMoods } from "@/lib/api/moods";

export default function MoodCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moodsByDay, setMoodsByDay] = useState<Record<string, NullableMood>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // TODO: replace with real Firebase Auth user later
  const userId = "testUser";

  // ✅ Load moods from Firestore when the month changes
  useEffect(() => {
    async function fetchMoods() {
      try {
        const prefix = `${currentMonth.getFullYear()}-${String(
          currentMonth.getMonth() + 1
        ).padStart(2, "0")}`;
        const loaded = await loadMoods(userId, prefix);
        setMoodsByDay(loaded);
      } catch (err) {
        console.error("Error loading moods:", err);
      }
    }
    fetchMoods();
  }, [currentMonth]);

  function handlePick(dateKey: string) {
    setSelectedDate(dateKey);
  }

  // ✅ Accept MoodType | null so we can also clear moods
  async function handleSelectMood(mood: NullableMood) {
    if (!selectedDate) return;

    // Update UI immediately
    setMoodsByDay((prev) => ({ ...prev, [selectedDate]: mood }));

    // Save to Firestore
    try {
      await saveMood(userId, selectedDate, mood);
      console.log("Mood saved:", mood, selectedDate);
    } catch (err) {
      console.error("Error saving mood:", err);
    }

    setSelectedDate(null);
  }

  const days = generateMonthDays(currentMonth, moodsByDay);

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Mood Calendar
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Track your daily emotions and see your growth journey.
          </p>
        </div>

        {/* Month switcher */}
        <div className="flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/5 px-2 py-2 backdrop-blur">
          <button
            className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/10 transition"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            ◀ Prev
          </button>
          <span className="px-3 py-1 text-lg font-semibold tabular-nums text-white">
            {currentMonth.toLocaleString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/10 transition"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            Next ▶
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Calendar block */}
        <section className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md">
          <CalendarGrid days={days} onPick={handlePick} />
        </section>

        {/* Sidebar */}
        <aside className="lg:w-80">
          <div
            className="mb-2 flex cursor-pointer items-center justify-between lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <h3 className="text-lg font-bold text-white">This Month</h3>
            <span className="text-sm text-white/70">
              {sidebarOpen ? "▴" : "▾"}
            </span>
          </div>
          {sidebarOpen && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md">
              <SummarySidebar moodsByDay={moodsByDay} monthDate={currentMonth} />
            </div>
          )}
        </aside>
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
