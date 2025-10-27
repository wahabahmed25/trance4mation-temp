"use client";
import React from "react";
import GameSection from "../components/GameSections";
const TrendingGamesSection = () => {
    return (
    <GameSection 
        title="Trending Now"
        subtitle="What the community is loving this week"
        filterKey="isTrending"
        filterValue={true}
        limit={6}
    />
  );
}

export default TrendingGamesSection
