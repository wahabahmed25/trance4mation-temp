"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewingDate, setViewingDate] = useState<string | null>(null);
  const [moodsByDay, setMoodsByDay] = useState<Record<string, MoodEntry>>({});
  const [loading, setLoading] = useState(true);

  // Load moods from Firestore or localStorage
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
        console.error(" Failed to load moods:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, [user]);

  // Persist moods
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
      console.error(" Failed to save moods:", err);
    }
  }, [moodsByDay, user, loading]);

  const handlePick = (dateKey: string) => {
    const entry = moodsByDay[dateKey];
    if (entry && entry.mood) setViewingDate(dateKey);
    else setSelectedDate(dateKey);
  };

  const handleSelectMood = (mood: MoodType | null, note?: string) => {
    if (!selectedDate) return;
    const newEntry = { mood, note: note || "" };
    setMoodsByDay((prev) => ({ ...prev, [selectedDate]: newEntry }));
    if (user) saveMoodEntry(user.uid, selectedDate, newEntry);
    setSelectedDate(null);
  };

  const days = generateMonthDays(currentMonth, moodsByDay);

  return (
    <main className="relative min-h-[90vh] flex flex-col items-center justify-start px-3 py-8 sm:px-4 sm:py-10 md:px-8 text-[#1E1E1E] overflow-hidden">
      <BackgroundElements />

      {/* Main Container */}
      <div
        className="
          relative w-full max-w-7xl rounded-3xl md:rounded-[2rem] border 
          border-[#E2EBF5]/60 bg-white/70 backdrop-blur-md 
          shadow-[0_0_40px_rgba(180,200,230,0.25)] 
          ring-1 ring-white/60 overflow-hidden transition-all duration-300
        "
      >
        {/* Soft light blue top glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 0%, rgba(190,220,255,0.15), transparent 70%)",
          }}
        />

        {/* Header */}
        <header
          className="
            relative z-10 mb-6 md:mb-8 flex flex-col gap-4 
            md:flex-row md:items-center md:justify-between
            px-4 pt-6 sm:px-6 md:px-8
          "
        >
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E1E1E] drop-shadow-sm">
              Mood Calendar
            </h1>
            <p className="text-sm text-[#5B7083]">
              Track your daily emotions and reflections ☁️
            </p>
          </div>

          {/* Right Side Buttons (stack nicely on mobile) */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            {/* Back Home Button — soft lavender aesthetic */}
            <button
              onClick={() => router.push("/home")}
              className="
                w-full sm:w-auto
                rounded-xl px-4 py-2 text-sm font-semibold 
                text-[#3E386A]
                bg-gradient-to-br from-[#F9F8FF] to-[#EEEAFE]
                border border-[#D7D3FA]/70
                shadow-sm hover:shadow-md hover:scale-[1.02]
                transition-all text-center
              "
            >
              ⬅ Back to Home
            </button>

            {/* Month switcher */}
            <div
              className="
                flex flex-wrap items-center gap-2 
                rounded-2xl bg-white/80 px-2 py-2 sm:px-3 shadow-inner 
                border border-[#E2EBF5]/60 backdrop-blur-sm
              "
            >
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="
                  rounded-xl px-3 py-2 md:px-4 md:py-2 
                  text-sm md:text-base
                  font-medium shadow-md transition-all hover:scale-[1.05] 
                  bg-black text-white
                "
              >
                ◀ Prev
              </button>

              <span className="px-2 sm:px-3 py-1 text-sm sm:text-lg font-semibold text-[#1E1E1E]">
                {currentMonth.toLocaleString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="
                  rounded-xl px-3 py-2 md:px-4 md:py-2 
                  text-sm md:text-base
                  font-medium shadow-md transition-all hover:scale-[1.05] 
                  bg-black text-white
                "
              >
                Next ▶
              </button>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div
          className="
            relative z-10 flex flex-col gap-6 
            px-4 pb-8 sm:px-6 sm:pb-10 
            lg:flex-row lg:gap-8 lg:px-8
          "
        >
          {/* Calendar */}
          <section
            className="
              flex-1 rounded-2xl md:rounded-3xl 
              bg-white/80 p-4 sm:p-6 shadow-inner 
              border border-[#E2EBF5]/60 backdrop-blur-md 
              transition-all hover:shadow-lg
            "
          >
            {loading ? (
              <p className="text-center text-[#5B7083] italic">
                Loading your moods...
              </p>
            ) : (
              <CalendarGrid days={days} onPick={handlePick} />
            )}
          </section>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4 sm:gap-6 mt-1 lg:mt-0 lg:w-80">
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

      {/* Modals */}
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