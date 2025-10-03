import MoodCalendarView from "@/features/mood-calendar/MoodCalendarView";

export const metadata = { title: "Mood Calendar | Play to Heal" };

export default function MoodCalendarPage() {
  return (
    <div
      className="min-h-screen w-full text-white"
      style={{
        background: `radial-gradient(80rem 80rem at 20% -10%, rgba(244,201,93,0.35), transparent),
                     linear-gradient(135deg, #0F4C5C, #0A2E38 60%)`,
      }}
    >
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <MoodCalendarView />
      </main>

      {/* Subtle glowing corner accents */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div
          className="absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "#F4C95D", opacity: 0.08 }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "#A78BFA", opacity: 0.08 }}
        />
      </div>
    </div>
  );
}
