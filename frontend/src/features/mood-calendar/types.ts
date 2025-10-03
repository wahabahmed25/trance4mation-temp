export type MoodType = "happy" | "neutral" | "sad" | "angry";
export type NullableMood = MoodType | null;

export type MoodDay = {
  key: string; // "YYYY-MM-DD"
  date: Date;
  mood: MoodType | null;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export const moodColors: Record<MoodType, string> = {
  happy: "bg-sunshine/60 border-sunshine text-ink",
  neutral: "bg-sky/40 border-sky/70 text-ink",
  sad: "bg-violet/40 border-violet/70 text-white",
  angry: "bg-peach/60 border-peach/70 text-white",
};