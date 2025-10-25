
export type MoodType = "happy" | "neutral" | "sad" | "angry" | "calm" | "tired";
export type NullableMood = MoodType | null;

export type MoodDay = {
  key: string; // "YYYY-MM-DD"
  date: Date;
  mood: MoodType | null;
  isCurrentMonth: boolean;
  isToday: boolean;
};


export type MoodEntry = {
  mood: NullableMood;
  note?: string;
};


export const moodColors: Record<MoodType, string> = {
  happy: "bg-sunshine/60 border-sunshine text-ink", // gold
  neutral: "bg-sky/40 border-sky/70 text-ink", // sky blue
  sad: "bg-violet/40 border-violet/70 text-white", // violet
  angry: "bg-peach/60 border-peach/70 text-white", // coral
  calm: "bg-emerald-200/50 border-emerald-400 text-ink", // mint green
  tired: "bg-gray-300/50 border-gray-400 text-ink", // soft gray
};

export const moodHexColors: Record<MoodType, string> = {
  happy: "#F4C95D",  // warm gold
  neutral: "#7EC8E3", // sky blue
  sad: "#A78BFA",     // soft violet
  angry: "#F6765E",   // coral red
  calm: "#A3E4B3",    // mint green 🌿
  tired: "#CFCFEA",   // lavender gray 😴
};
