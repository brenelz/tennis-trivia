import { useState } from "react";
import { Player, uniqueCountries, top100Players } from "../lib/players";
import { GameStateContext, initialGameState } from "../lib/game";
import GameCompleted from "../components/GameCompleted";
import PlayerCard from "../components/PlayerCard";
import { GetServerSideProps } from "next";

type GameProps = {
  countries: string[];
  players: Player[];
};

export default function Game({ players, countries }: GameProps) {
  const [gameState, setGameState] = useState(initialGameState);

  const player = players[gameState.currentStep];

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      <div>
        {player ? (
          <PlayerCard countries={countries} player={player} />
        ) : (
          <GameCompleted />
        )}
      </div>
    </GameStateContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random());
  const top5Players = randomizedPlayers.slice(0, 5);

  return {
    props: {
      countries: uniqueCountries,
      players: top5Players,
    },
  };
};
