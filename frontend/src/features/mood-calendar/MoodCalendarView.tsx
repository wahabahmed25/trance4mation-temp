"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarGrid } from "./components/CalendarGrid";
import { MoodPicker } from "./components/MoodPicker";
import { SummarySidebar } from "./components/SummarySidebar";
import { ReminderToast } from "./components/ReminderToast";
import { QuickLogCard } from "./components/QuickLogCard";
import { generateMonthDays } from "./utils/calendar";
import type { MoodType, MoodEntry } from "@/features/mood-calendar/types";
import BackgroundElements from "@/components/ui/BackgroundElements";
import { loadMoodEntries, saveMoodEntry } from "@/lib/api/moods";
import { ReflectionModal } from "./components/ReflectionModal";
import { useAuth } from "@/context/AuthContext";

export default function MoodCalendarView() {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewingDate, setViewingDate] = useState<string | null>(null);
  const [moodsByDay, setMoodsByDay] = useState<Record<string, MoodEntry>>({});
  const [loading, setLoading] = useState(true);

  /** 🧠 Load moods from Firestore or localStorage */
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        if (user) {
          const cloud = await loadMoodEntries(user.uid);
          if (Object.keys(cloud).length > 0) setMoodsByDay(cloud);
          else {
            const local = localStorage.getItem("moodsByDay");
            if (local) setMoodsByDay(JSON.parse(local));
          }
        } else {
          const local = localStorage.getItem("moodsByDay");
          if (local) setMoodsByDay(JSON.parse(local));
        }
      } catch (err) {
        console.error("❌ Failed to load moods:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, [user]);

  /** 💾 Persist to Firestore + localStorage */
  useEffect(() => {
    if (loading) return;
    try {
      localStorage.setItem("moodsByDay", JSON.stringify(moodsByDay));
      if (user) {
        Object.entries(moodsByDay).forEach(([date, entry]) =>
          saveMoodEntry(user.uid, date, entry)
        );
      }
    } catch (err) {
      console.error("❌ Failed to save moods:", err);
    }
  }, [moodsByDay, user, loading]);

  /** 🗓️ Handle day click */
  const handlePick = (dateKey: string) => {
    const entry = moodsByDay[dateKey];
    if (entry && entry.mood) setViewingDate(dateKey);
    else setSelectedDate(dateKey);
  };

  /** ✅ Save mood + reflection note */
  const handleSelectMood = (mood: MoodType | null, note?: string) => {
    if (!selectedDate) return;
    const newEntry = { mood, note: note || "" };
    setMoodsByDay((prev) => ({ ...prev, [selectedDate]: newEntry }));
    if (user) saveMoodEntry(user.uid, selectedDate, newEntry);
    setSelectedDate(null);
  };

  /** 📆 Generate month days */
  const days = generateMonthDays(currentMonth, moodsByDay);

  return (
    <main className="relative min-h-[90vh] flex flex-col items-center justify-start px-4 py-12 md:px-8 text-[#3C2F2F] overflow-hidden">
      <BackgroundElements />

      {/* === Container === */}
      <div
        className="
          relative w-full max-w-7xl rounded-[2rem] border 
          border-[#F9A88D]/40 bg-white/60 backdrop-blur-md 
          shadow-[0_0_30px_rgba(249,168,141,0.15)] 
          ring-1 ring-white/40 overflow-hidden transition-all duration-300
        "
      >
        {/* Coral accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 0%, rgba(249,168,141,0.1), transparent 70%)",
          }}
        />

        {/* ===== Header ===== */}
        <header className="relative z-10 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-8 pt-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#F9A88D] drop-shadow-sm">
              Mood Calendar
            </h1>
            <p className="text-sm text-[#7C6A65] mt-1">
              Track your daily emotions and reflections 🌤️
            </p>
          </div>

          {/* Month switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 shadow-inner border border-[#F9A88D]/40 backdrop-blur-sm">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="flex items-center justify-center rounded-xl px-4 py-2 text-white font-medium shadow-md hover:scale-[1.05]"
                style={{
                  background:
                    "linear-gradient(135deg,#FDDAC5 0%,#F9A88D 100%)",
                  boxShadow:
                    "inset 0 1px 4px rgba(255,255,255,0.5),0 4px 12px rgba(249,168,141,0.35)",
                }}
              >
                ◀ Prev
              </button>

              <span className="px-3 py-1 text-lg font-semibold text-[#3C2F2F]">
                {currentMonth.toLocaleString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="flex items-center justify-center rounded-xl px-4 py-2 text-white font-medium shadow-md hover:scale-[1.05]"
                style={{
                  background:
                    "linear-gradient(135deg,#FDDAC5 0%,#F9A88D 100%)",
                  boxShadow:
                    "inset 0 1px 4px rgba(255,255,255,0.5),0 4px 12px rgba(249,168,141,0.35)",
                }}
              >
                Next ▶
              </button>
            </div>
          </div>
        </header>

        {/* ===== Main Layout ===== */}
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row px-8 pb-10">
          {/* Calendar */}
          <section className="flex-1 rounded-3xl bg-white/75 p-6 shadow-inner border border-[#F9A88D]/30 backdrop-blur-md transition-all hover:shadow-lg">
            {loading ? (
              <p className="text-center text-[#7C6A65] italic">
                Loading your moods...
              </p>
            ) : (
              <CalendarGrid days={days} onPick={handlePick} />
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:w-80 flex flex-col gap-6">
            <QuickLogCard
              onSelect={(mood) => {
                const today = new Date().toLocaleDateString("en-CA", {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                });
                const newEntry = { mood, note: "" };
                setMoodsByDay((prev) => ({ ...prev, [today]: newEntry }));
                if (user) saveMoodEntry(user.uid, today, newEntry);
              }}
            />
            <SummarySidebar moodsByDay={moodsByDay} monthDate={currentMonth} />
          </aside>
        </div>
      </div>

      {/* === Modals === */}
      {selectedDate && (
        <MoodPicker
          dateKey={selectedDate}
          onSelect={handleSelectMood}
          onClose={() => setSelectedDate(null)}
        />
      )}

      {viewingDate && moodsByDay[viewingDate] && (
        <ReflectionModal
          dateKey={viewingDate}
          entry={moodsByDay[viewingDate]}
          onEdit={() => {
            setSelectedDate(viewingDate);
            setViewingDate(null);
          }}
          onClear={() => {
            const copy = { ...moodsByDay };
            delete copy[viewingDate];
            setMoodsByDay(copy);
            if (user) saveMoodEntry(user.uid, viewingDate, null);
            setViewingDate(null);
          }}
          onClose={() => setViewingDate(null)}
        />
      )}

      <ReminderToast />
    </main>
  );
}