import MoodCalendarView from "@/features/mood-calendar/MoodCalendarView";

export const metadata = { title: "Mood Calendar | Play to Heal" };

export default function MoodCalendarPage() {
  return (
    <div
      className="relative min-h-screen w-full text-[#2C2C2C] overflow-hidden"
      style={{
        // refined gradient: sky blue limited to 6%, fading into near-white lavender
        background: `
          linear-gradient(
            180deg,
            #7EC8E3 0%,      /* top sky blue */
            #BFE9F5 4%,      /* softer sky fade */
            #F5F4FF 10%,     /* extremely pale lavender */
            #F9F8FF 28%,     /* almost white with faint violet hint */
            #FBFAFF 55%,     /* near-white */
            #FEFEFF 100%     /* pure white with minimal lilac undertone */
          )
        `,
      }}
    >
      <main className="relative mx-auto max-w-7xl px-4 py-10 md:px-8">
        <MoodCalendarView />
      </main>

      {/* Ambient glows — cool, elegant, tranquil */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* top-center sky glow */}
        <div
          className="absolute top-[-80px] left-1/2 -translate-x-1/2 h-[220px] w-[480px] rounded-full blur-[130px]"
          style={{ background: "#7EC8E3", opacity: 0.18 }}
        />

        {/* top-left soft violet hue */}
        <div
          className="absolute -left-24 -top-24 h-64 w-64 rounded-full blur-[100px]"
          style={{ background: "#C9BCFF", opacity: 0.1 }}
        />

        {/* mid-page diffuse lavender haze */}
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-[150px]"
          style={{ background: "#F9F8FF", opacity: 0.12 }}
        />

        {/* bottom-right faint violet reflection */}
        <div
          className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-[120px]"
          style={{ background: "#F4F2FF", opacity: 0.08 }}
        />

        {/* bottom-left whisper of lavender light */}
        <div
          className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-[100px]"
          style={{ background: "#F7F6FF", opacity: 0.05 }}
        />
      </div>
    </div>
  );
}
