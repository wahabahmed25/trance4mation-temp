"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Brand Palette -----------------------------------------------------------
// IMPORTANT: No trailing comma after the last key.
const PALETTE = {
  coral: "#FF6F61", // Healing Coral
  teal: "#0F4C5C", // Deep Teal
  glow: "#F4C95D", // Golden Glow
  sky: "#7EC8E3", // Sky Blue
  violet: "#A78BFA" // Soft Violet
}

// --- Dev “tests” / sanity checks (run only in dev in the browser) ------------
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const hex = /^#([0-9A-F]{6})$/i;
  console.assert(Object.keys(PALETTE).length === 5, "PALETTE should have 5 colors");
  (Object.entries(PALETTE) as Array<[string, string]>).forEach(([k, v]) => {
    console.assert(hex.test(v), `PALETTE.${k} is not a valid 6-digit hex`);
  });

  // Pure helpers to test search logic without React hooks
  

//   console.assert(searchGames("focus").length > 0, 'Search("focus") should return results');
//   console.assert(GAMES.filter((g) => g.featured).length >= 3, "Expected >= 3 featured games in seed data");
//   console.assert(GAMES.filter((g) => (g.progress ?? 0) > 0).length >= 1, "There should be games with progress");
}

// --- Types ------------------------------------------------------------------
type Game = {
  id: string;
  name: string;
  tags: string[];
  color: string; // used for subtle accents
  rating: number; // 0..5
  plays: number; // total plays
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  progress?: number; // percent 0..100 (for "Continue Playing")
};

// --- Sample Data -------------------------------------------------------------
const GAMES: Game[] = [
  {
    id: "mind-quest",
    name: "Mind Quest",
    tags: ["focus", "memory"],
    color: PALETTE.glow,
    rating: 4.7,
    plays: 12900,
    featured: true,
    trending: true,
    progress: 64,
  },
  {
    id: "calm-runner",
    name: "Calm Runner",
    tags: ["breathing", "mindful"],
    color: PALETTE.sky,
    rating: 4.5,
    plays: 9700,
    featured: true,
    trending: true,
    progress: 38,
  },
  {
    id: "focus-builder",
    name: "Focus Builder",
    tags: ["focus", "productivity"],
    color: PALETTE.coral,
    rating: 4.6,
    plays: 15230,
    trending: true,
    progress: 80,
  },
  {
    id: "resilience-puzzle",
    name: "Resilience Puzzle",
    tags: ["resilience", "problem-solving"],
    color: PALETTE.violet,
    rating: 4.8,
    plays: 18420,
    featured: true,
    isNew: true,
  },
  {
    id: "gratitude-garden",
    name: "Gratitude Garden",
    tags: ["gratitude", "journaling"],
    color: PALETTE.glow,
    rating: 4.4,
    plays: 6100,
    isNew: true,
  },
  {
    id: "sleep-symphony",
    name: "Sleep Symphony",
    tags: ["sleep", "relax"],
    color: PALETTE.sky,
    rating: 4.2,
    plays: 4300,
  },
  {
    id: "social-circle",
    name: "Social Circle",
    tags: ["community", "circle"],
    color: PALETTE.coral,
    rating: 4.1,
    plays: 7800,
  },
  {
    id: "test-puzzle",
    name: "Test Puzzle",
    tags: ["logic"],
    color: PALETTE.violet,
    rating: 4.0,
    plays: 2500,
  },
];
const searchGames = (q: string) => {
    const query = q.trim().toLowerCase();
    if (!query) return GAMES;
    return GAMES.filter(
      (g) => g.name.toLowerCase().includes(query) || g.tags.some((t) => t.toLowerCase().includes(query))
    );
  };

// --- UI helpers --------------------------------------------------------------
function classNames(...s: Array<string | false | undefined>) {
  return s.filter(Boolean).join(" ");
}

const Card: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div
    className={classNames(
      // NOTE: Avoid Tailwind "opacity suffix" on arbitrary colors (e.g., bg-[rgb(...)]/60),
      // which can crash older Tailwind parsers. We encode alpha directly via RGBA instead.
      "rounded-2xl border border-white/10 bg-[rgba(17,24,39,0.6)] backdrop-blur-xl",
      "shadow-[0_10px_30px_rgba(0,0,0,.35)]",
      className
    )}
  >
    {children}
  </div>
);

const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  href?: string;
}> = ({ title, subtitle, href }) => (
  <div className="mb-4 flex items-end justify-between gap-3">
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-white/60">{subtitle}</p>
      )}
    </div>
    {href && (
      <Link
        href={href}
        className="rounded-xl border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:text-white hover:border-white/20"
      >
        View all →
      </Link>
    )}
  </div>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70">
    {children}
  </span>
);

const Rating: React.FC<{ value: number }> = ({ value }) => {
  const full = Math.round(value);
  return (
    <div aria-label={`Rating ${value} out of 5`} className="text-amber-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

const GameTile: React.FC<{ game: Game } & React.HTMLAttributes<HTMLDivElement>> = ({
  game,
  className,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Link href={`/games/${game.id}`} aria-label={`Open ${game.name}`}>
      <div
        {...props}
        className={classNames(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4",
          "hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,.35)]",
          className
        )}
      >
        <div
          className="absolute -right-24 -top-24 h-48 w-48 rounded-full blur-2xl opacity-20"
          style={{ background: game.color }}
        />
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{game.name}</h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {game.tags.slice(0, 3).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div className="text-right">
            <Rating value={game.rating} />
            <p className="mt-1 text-xs text-white/60">{game.plays.toLocaleString()} plays</p>
          </div>
        </div>
        {game.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-[rgba(167,139,250,0.2)] px-2 py-0.5 text-[10px] font-semibold text-[#E9D5FF]">
            NEW
          </span>
        )}
        {game.trending && (
          <span className="absolute right-4 top-4 rounded-full bg-[rgba(255,111,97,0.2)] px-2 py-0.5 text-[10px] font-semibold text-[#FFBCB0]">
            TRENDING
          </span>
        )}
        {game.featured && (
          <span className="absolute left-4 bottom-4 rounded-full bg-[rgba(244,201,93,0.18)] px-2 py-0.5 text-[10px] font-semibold text-[#FFE8A3]">
            FEATURED
          </span>
        )}
      </div>
    </Link>
  </motion.div>
);

const ProgressBar: React.FC<{ value: number; color?: string }> = ({ value, color }) => (
  <div className="h-2 w-full rounded-full bg-white/10">
    <div
      className="h-2 rounded-full"
      style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color ?? PALETTE.sky }}
    />
  </div>
);

// --- Page -------------------------------------------------------------------
export default function TestHome() {
  const [query, setQuery] = useState("");

  const featured = useMemo(() => GAMES.filter((g) => g.featured), []);
  const trending = useMemo(() => GAMES.filter((g) => g.trending), []);

  // naive "For You": prefer focus / resilience / mindful tags
  const forYou = useMemo(
    () => GAMES.filter((g) => /(focus|resilience|mindful)/.test(g.tags.join(" "))).slice(0, 6),
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return GAMES;
    const q = query.toLowerCase();
    return GAMES.filter(
      (g) => g.name.toLowerCase().includes(q) || g.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const continuePlaying = useMemo(() => GAMES.filter((g) => (g.progress ?? 0) > 0), []);

  return (
    <div
      className="min-h-screen w-full"
      // Use inline style for multi-layer background to avoid Tailwind parser issues with
      // complex arbitrary values containing commas.
      style={{
        background:
          `radial-gradient(1200px 800px at 20% 0%, rgba(126,200,227,0.15), transparent 60%),` +
          `radial-gradient(1000px 700px at 90% 10%, rgba(167,139,250,0.12), transparent 60%),` +
          `linear-gradient(180deg, #0B2F39 0%, #0F172A 60%, #0B1220 100%)`,
      }}
    >
      {/* Top Nav */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[rgba(15,17,32,0.6)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ background: PALETTE.coral }}>
              <span className="text-lg">🌀</span>
            </span>
            <span className="text-lg font-bold tracking-tight text-white">PLAY‑TO‑HEAL</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <Link href="#games" className="hover:text-white">Games</Link>
            <Link href="#featured" className="hover:text-white">Featured</Link>
            <Link href="#trending" className="hover:text-white">Trending</Link>
            <Link href="#for-you" className="hover:text-white">For You</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:text-white hover:border-white/20"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-xl px-3 py-1.5 text-sm font-semibold text-[#0B1220]"
              style={{ background: `linear-gradient(90deg, ${PALETTE.coral}, ${PALETTE.glow})` }}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Content Container */}
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8">
        {/* HERO */}
        <section className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          <Card className="relative col-span-2 overflow-hidden p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Build calm, focus, and resilience—through play
              </h1>
              <p className="mt-2 max-w-2xl text-white/70">
                Bite‑size games designed with mental wellness in mind. Track your mood, join a circle,
                and keep streaks that actually feel good.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="#featured"
                  className="rounded-xl px-4 py-2 font-semibold text-[#0B1220]"
                  style={{ background: `linear-gradient(90deg, ${PALETTE.glow}, ${PALETTE.sky})` }}
                >
                  Try a Featured Game
                </Link>
                <Link
                  href="#mood"
                  className="rounded-xl border border-white/10 px-4 py-2 text-white/90 hover:text-white hover:border-white/20"
                >
                  Log today’s mood
                </Link>
              </div>
            </motion.div>

            {/* Search */}
            <div className="mt-6">
              <label htmlFor="search" className="sr-only">
                Search games
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <span>🔎</span>
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search games, e.g. focus, breathing, gratitude…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {["focus", "mindful", "sleep", "gratitude", "community"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/70 hover:text-white"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-20"
              style={{ background: PALETTE.violet }}
            />
          </Card>

          {/* Mood / Quick Actions */}
          <Card  className="p-6">
            <h3 className="text-xl font-semibold text-white">Log your mood today</h3>
            <p className="mt-1 text-sm text-white/70">
              Reflect and track your emotions through playful moods.
            </p>
            <div className="mt-4 flex items-center justify-between gap-2 text-3xl">
              {"😀🙂😳😴😡".split("").map((m, i) => (
                <button key={i} className="transition-transform hover:scale-110" aria-label={`mood ${i}`}>
                  <span>{m}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
              <Link href="/circle" className="rounded-xl bg-white/5 p-3 text-center text-white/80 hover:text-white">
                💬 Circle
              </Link>
              <Link href="/mood" className="rounded-xl bg-white/5 p-3 text-center text-white/80 hover:text-white">
                📅 Mood
              </Link>
              <Link href="/social" className="rounded-xl bg-white/5 p-3 text-center text-white/80 hover:text-white">
                👥 Social
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/60">Your emotional well‑being matters 💙</p>
          </Card>
        </section>

        {/* FEATURED ---------------------------------------------------------- */}
        <section id="featured" className="mt-10">
          <SectionHeader title="Featured" subtitle="Editor’s picks to get you started" href="#games" />
          <div className="-mx-2 flex snap-x gap-4 overflow-x-auto px-2 pb-2">
            {featured.map((g) => (
              <div key={g.id} className="min-w-[260px] snap-start">
                <GameTile game={g} className="h-full" />
              </div>
            ))}
          </div>
        </section>

        {/* CONTINUE PLAYING -------------------------------------------------- */}
        <section className="mt-10">
          <SectionHeader title="Continue Playing" subtitle="Pick up where you left off" href="#games" />
          <Card className="divide-y divide-white/5">
            {continuePlaying.map((g) => (
              <div key={g.id} className="grid grid-cols-12 items-center gap-3 p-4 text-sm">
                <div className="col-span-5 flex items-center gap-3">
                  <span className="text-lg">🎮</span>
                  <Link href={`/games/${g.id}`} className="font-medium text-white hover:underline">
                    {g.name}
                  </Link>
                  <div className="hidden gap-1 sm:flex">
                    {g.tags.slice(0, 2).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                <div className="col-span-5">
                  <ProgressBar value={g.progress ?? 0} color={g.color} />
                </div>
                <div className="col-span-2 text-right text-white/70">{g.progress}%</div>
              </div>
            ))}
          </Card>
        </section>

        {/* FOR YOU ----------------------------------------------------------- */}
        <section id="for-you" className="mt-10">
          <SectionHeader title="For You" subtitle="A personalized mix based on your interests" href="#games" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {forYou.map((g) => (
              <GameTile key={g.id} game={g} />
            ))}
          </div>
        </section>

        {/* TRENDING ---------------------------------------------------------- */}
        <section id="trending" className="mt-10">
          <SectionHeader title="Trending Now" subtitle="What the community is loving this week" href="#games" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((g) => (
              <GameTile key={g.id} game={g} />
            ))}
          </div>
        </section>

        {/* ALL GAMES / HUB --------------------------------------------------- */}
        <section id="games" className="mt-10">
          <SectionHeader title="Game Hub" subtitle={query ? `Results for "${query}"` : "Explore all experiences"} />
          {filtered.length === 0 ? (
            <Card className="p-10 text-center text-white/70">No results. Try another keyword.</Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <GameTile key={g.id} game={g} />
              ))}
            </div>
          )}
        </section>

        {/* COMMUNITY / LEADERBOARD / NEWS ----------------------------------- */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="p-6 md:col-span-2">
            <h3 className="text-xl font-semibold text-white">Community Leaderboard</h3>
            <p className="mt-1 text-sm text-white/70">Celebrate consistency. Streaks are about care, not pressure ✨</p>
            <div className="mt-4 divide-y divide-white/5">
              {[
                { name: "Rin", streak: 19 },
                { name: "Ava", streak: 17 },
                { name: "Neo", streak: 15 },
                { name: "Kai", streak: 14 },
              ].map((u, i) => (
                <div key={u.name} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{["🥇", "🥈", "🥉", "🏅"][i]}</span>
                    <span className="font-medium text-white">{u.name}</span>
                  </div>
                  <span className="rounded-full bg-white/5 px-2 py-1 text-white/70">{u.streak}‑day streak</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-white">Daily Challenge</h3>
            <p className="mt-1 text-sm text-white/70">Complete today’s micro‑goal to earn a glow badge.</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              <li>2 minutes of box breathing 🫁</li>
              <li>Finish level 3 in Focus Builder 🎯</li>
              <li>Share 1 gratitude in your circle 💙</li>
            </ul>
            <Link
              href="/challenge"
              className="mt-5 inline-block rounded-xl px-4 py-2 font-semibold text-[#0B1220]"
              style={{ background: `linear-gradient(90deg, ${PALETTE.sky}, ${PALETTE.violet})` }}
            >
              Start Challenge
            </Link>
          </Card>
        </section>

        {/* NEWSLETTER / CTA -------------------------------------------------- */}
        <section className="mt-10">
          <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Get weekly tips</h3>
              <p className="text-sm text-white/70">Short reads on mindfulness, sleep, and focus.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed ✨ (demo)");
              }}
              className="flex w-full max-w-md items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2 font-semibold text-[#0B1220]"
                style={{ background: `linear-gradient(90deg, ${PALETTE.coral}, ${PALETTE.glow})` }}
              >
                Subscribe
              </button>
            </form>
          </Card>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} Play‑to‑Heal — Designed for calm. Colors: Healing Coral, Deep Teal,
          Golden Glow, Sky Blue, Soft Violet.
        </p>
      </footer>
    </div>
  );
}
