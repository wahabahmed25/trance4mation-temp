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
  import type { MoodType } from "../types";
  
  export function generateMonthDays(currentMonth: Date, moodsByDay: Record<string, MoodType | null>) {
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
      days.push({
        key,
        date: day,
        isCurrentMonth: isSameMonth(day, currentMonth),
        isToday: isToday(day),
        mood: moodsByDay[key] || null,
      });
      day = addDays(day, 1);
    }
  
    return days;
  }
  