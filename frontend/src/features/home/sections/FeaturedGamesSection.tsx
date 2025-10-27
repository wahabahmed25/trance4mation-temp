"use client";

import GameSection from "../components/GameSections";

const FeaturedGamesSection = () => {
  return(
    <div>
      <GameSection 
        title="Featured"
        subtitle="Editor’s picks to get you started"
        filterKey="featured"
        filterValue={true}
        limit={4}
    />
    </div>
  )
  
};

export default FeaturedGamesSection;