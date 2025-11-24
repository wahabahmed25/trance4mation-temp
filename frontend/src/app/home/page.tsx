import SearchCardSection from "@/features/home/sections/SearchCardSection";
import MoodWidget from "@/features/home/sections/MoodWidget";
import HomeLayout from "@/features/home/HomeLayout";
// import ForyouGames from "@/features/home/sections/ForyouGames";
// import TrendingGamesSection from "@/features/home/sections/TrendingGamesSection";
// import FeaturedGamesSection from "@/features/home/sections/FeaturedGamesSection";
import GameHubSection from "@/features/home/sections/GameHubSection";
import AnalyticsDashboard from "@/features/home/analytics/AnalyticsDashboard";
// import PlayAgainSection from "@/features/home/sections/PlayAgainSection";
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
        
        <GameHubSection />

        {/* ✅ Full-width Continue Playing */}
        <div className="w-screen -mx-[calc((100vw-100%)/2)]">
          {/* <PlayAgainSection /> */}
        </div>
        {/* <FeaturedGamesSection /> */}
        {/* <ForyouGames /> */}
        {/* <TrendingGamesSection /> */}
        <AnalyticsDashboard />
      </div>
    </HomeLayout>
  );
}
