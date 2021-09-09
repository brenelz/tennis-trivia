import { useEffect, useState } from "react";
import { Player, uniqueCountries, getPlayers } from "../lib/players";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { GameStateContext, initialGameState } from "../lib/game";
import GameCompleted from "../components/GameCompleted";
import PlayerCard from "../components/PlayerCard";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";

type GameProps = {
  countries: string[];
};

export default function Game({ countries }: GameProps) {
  const router = useRouter();
  const [gameState, setGameState] = useState(initialGameState);

  const players = useQuery<Player[]>("players", getPlayers);

  const player = players.data && players.data[gameState.currentStep];

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      router.push("/");
    }
  }, [router]);

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
  return {
    props: {
      countries: uniqueCountries,
    },
  };
};
