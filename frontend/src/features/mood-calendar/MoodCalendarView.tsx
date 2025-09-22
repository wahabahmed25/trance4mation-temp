"use client";

import { useState } from "react";
import { CalendarGrid } from "./components/CalendarGrid";
import { SummarySidebar } from "./components/SummarySidebar";
import { MoodPicker } from "./components/MoodPicker";
import { ReminderToast } from "./components/ReminderToast";
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "./utils/date";
import type { MoodDay, MoodType } from "./types";

const INITIAL_MOODS: Record<string, MoodType | null> = {}; 
// key = "YYYY-MM-DD", value = mood emoji key (e.g., "happy") or null

export default function MoodCalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [moodsByDay, setMoodsByDay] = useState<Record<string, MoodType | null>>(INITIAL_MOODS);
  const [pickerFor, setPickerFor] = useState<string | null>(null); // date key

  // Construct visible days (full weeks covering the month)
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);

  const days: MoodDay[] = [];
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
    const key = d.toISOString().slice(0, 10);
    days.push({
      date: d,
      key,
      mood: moodsByDay[key] ?? null,
      isCurrentMonth: d.getMonth() === selectedDate.getMonth(),
      isToday: key === new Date().toISOString().slice(0,10),
    });
  }
  function setMood(dateKey: string, mood: MoodType) {
    setMoodsByDay(prev => ({ ...prev, [dateKey]: mood }));
    setPickerFor(null);
  }
// line 44 -> change main calendar bar color
// line 72 -> change sidebar color
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border bg-violet-400 p-4 shadow-sm">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mood Calendar</h1>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border px-3 py-1 hover:bg-red-400"
              onClick={() => setSelectedDate(addDays(startOfMonth(selectedDate), -1))}
            >
              ◀ Prev
            </button>
            <div className="text-sm text-black">
              {selectedDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
            </div>
            <button
              className="rounded-lg border px-3 py-1 hover:bg-red-400"
              onClick={() => setSelectedDate(addDays(endOfMonth(selectedDate), 1))}
            >
              Next ▶
            </button>
          </div>
        </header>

        <CalendarGrid
          days={days}
          onPick={(dateKey) => setPickerFor(dateKey)}
        />
      </section>

      <aside className="rounded-2xl border bg-violet-400 p-4 shadow-sm">
        <SummarySidebar moodsByDay={moodsByDay} monthDate={selectedDate} />
      </aside>

      <ReminderToast />

      {pickerFor && (
        <MoodPicker
          dateKey={pickerFor}
          onSelect={(m) => setMood(pickerFor, m)}
          onClose={() => setPickerFor(null)}
        />
      )}
    </main>
  );
}