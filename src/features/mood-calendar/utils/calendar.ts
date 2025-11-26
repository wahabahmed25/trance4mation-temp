import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
} from "date-fns";
import type { MoodType, MoodEntry } from "../types";

/**
 * Generates the grid of days for the current month, including mood data.
 * Supports the new journaling data model: { mood, note }.
 */
export function generateMonthDays(
  currentMonth: Date,
  moodsByDay: Record<string, MoodEntry>
) {
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }); // Monday start
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const days: {
    key: string;
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    mood: MoodType | null;
  }[] = [];

  let day = start;

  while (day <= end) {
    const key = format(day, "yyyy-MM-dd");

    // ✅ Safely extract mood from the entry (handles both old & new formats)
    const entry = moodsByDay[key];
    const mood = entry ? entry.mood : null;

    days.push({
      key,
      date: day,
      isCurrentMonth: isSameMonth(day, currentMonth),
      isToday: isToday(day),
      mood,
    });

    day = addDays(day, 1);
  }

  return days;
}
