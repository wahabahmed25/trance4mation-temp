import MoodCalendarView from "@/features/mood-calendar/MoodCalendarView";

export const metadata = { title: "Mood Calendar | Play to Heal" };

export default function MoodCalendarPage() {
  return (
    <div
      className="relative min-h-screen w-full text-[#2C2C2C] overflow-hidden"
      style={{
        // 🌤 subtle blue only across top ~15% → fades quickly to warm base
        background: `
          linear-gradient(180deg, #7EC8E3 0%, #E9F8FF 8%, #FDE7D8 15%, #FFF7E8 55%, #FFF7D8 100%)
        `,
      }}
    >
      <main className="relative mx-auto max-w-7xl px-4 py-10 md:px-8">
        <MoodCalendarView />
      </main>

      {/* Ambient glows — balanced & soft */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* very soft top-center sky glow */}
        <div
          className="absolute top-[-80px] left-1/2 -translate-x-1/2 h-[220px] w-[480px] rounded-full blur-[130px]"
          style={{ background: "#7EC8E3", opacity: 0.20 }}
        />

        {/* top-left violet hue */}
        <div
          className="absolute -left-24 -top-24 h-64 w-64 rounded-full blur-[100px]"
          style={{ background: "#A78BFA", opacity: 0.13 }}
        />

        {/* mid-page golden warmth */}
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-[150px]"
          style={{ background: "#FFD166", opacity: 0.12 }}
        />

        {/* bottom coral glow */}
        <div
          className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-[120px]"
          style={{ background: "#FCA17D", opacity: 0.18 }}
        />

        {/* faint sky reflection bottom-left */}
        <div
          className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-[100px]"
          style={{ background: "#7EC8E3", opacity: 0.07 }}
        />
      </div>
    </div>
  );
}
