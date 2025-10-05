import React from "react";
import GameSection from "../components/GameSections";
const ForyouGames = () => {
  return (
    <GameSection 
        title="For You"
        subtitle="A personalized mix based on your interests"
        filterKey="ForYou"
        filterValue={true}
        limit={4}
    />
  );
};

export default ForyouGames;
