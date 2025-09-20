export type MoodType = "happy" | "neutral" | "sad" | "angry";

export type MoodDay = {
  key: string;         // "YYYY-MM-DD"
  date: Date;
  mood: MoodType | null;
  isCurrentMonth: boolean;
  isToday: boolean;
};