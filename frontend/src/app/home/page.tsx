import SearchCardSection from "@/home-page/sections/SearchCardSection";
import MoodWidget from "@/home-page/sections/MoodWidget";
import HomeLayout from "@/home-page/HomeLayout";
import ContinuePlayingSection from "@/home-page/sections/ContinuePlayingSection";
import ForyouGames from "@/home-page/sections/ForyouGames";
import TrendingGamesSection from "@/home-page/sections/TrendingGamesSection";
import FeaturedGamesSection from "@/home-page/sections/FeaturedGamesSection";
import GameHubSection from "@/home-page/sections/GameHubSection";

export default function Home() {
  return (
    <HomeLayout>
      {/* 🔹 Top Section: Search (left) + Mood Widget (right) */}
      <section className="flex flex-col lg:flex-row justify-between items-stretch mt-10 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 gap-2 lg:gap-3">
        {/* Left side — Search */}
        <div className="flex-[2] w-full h-full">
          <SearchCardSection />
        </div>

        {/* Right side — Mood Widget */}
        <div className="flex-[1] w-full">
          <MoodWidget />
        </div>
      </section>

      {/* 🔹 Everything else stacked below */}
      <div className="flex flex-col mx-auto w-full mt-8">
        <FeaturedGamesSection />

        {/* ✅ Full-width Continue Playing */}
        <div className="w-screen -mx-[calc((100vw-100%)/2)]">
          <ContinuePlayingSection />
        </div>

        <ForyouGames />
        <TrendingGamesSection />
        <GameHubSection />
      </div>
    </HomeLayout>
  );
}
