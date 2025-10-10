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
import { auth, signInWithGoogle } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function MoodCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moodsByDay, setMoodsByDay] = useState<Record<string, NullableMood>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // 🔑 Handle Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName ?? user.email ?? "User");
      } else {
        setUserId(null);
        setUserName(null);
      }
    });
    return unsubscribe;
  }, []);

  // ✅ Load moods from Firestore when user and month are ready
  useEffect(() => {
    if (!userId) return;

    async function fetchMoods() {
      try {
        const prefix = `${currentMonth.getFullYear()}-${String(
          currentMonth.getMonth() + 1
        ).padStart(2, "0")}`;
        const loaded = await loadMoods(userId!, prefix);
        setMoodsByDay(loaded);
      } catch (err) {
        console.error("Error loading moods:", err);
      }
    }

    fetchMoods();
  }, [userId, currentMonth]);

  function handlePick(dateKey: string) {
    setSelectedDate(dateKey);
  }

  async function handleSelectMood(mood: NullableMood) {
    if (!selectedDate || !userId) return;
    setMoodsByDay((prev) => ({ ...prev, [selectedDate]: mood }));

    try {
      await saveMood(userId, selectedDate, mood);
      console.log("Mood saved:", mood, selectedDate);
    } catch (err) {
      console.error("Error saving mood:", err);
    }

    setSelectedDate(null);
  }

  const days = generateMonthDays(currentMonth, moodsByDay);

  // ✅ Show Sign-In screen if not logged in
  if (!userId) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0F4C5C] text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">
            Sign in to access your Mood Calendar
          </h1>
          <button
            onClick={signInWithGoogle}
            className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white hover:bg-white/20 transition"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          {/* 👋 Greeting */}
          <span className="text-sm text-white/70">
            Welcome back, <span className="font-semibold text-white">{userName?.split(" ")[0]}</span> 👋
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Mood Calendar
          </h1>
          <p className="text-sm text-white/70">
            Track your daily emotions and see your growth journey.
          </p>
        </div>

        {/* Controls (Month switcher + Log Out) */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Month switcher */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-2 backdrop-blur">
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

          {/* 🔥 Log Out */}
          <button
            onClick={() => signOut(auth)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/20 hover:text-white transition shadow-[0_0_8px_rgba(255,255,255,0.25)]"
          >
            Log Out
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
