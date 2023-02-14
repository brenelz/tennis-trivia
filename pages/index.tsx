import { useState } from "react";
import { Player } from "../lib/players";
import Game from "../components/Game";

export default function Home() {
  const [game, setGame] = useState(0);
  const [playersData, setPlayersData] = useState<Player[]>([]);

  const nextGame = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/newGame"
    );
    const data = await response.json();
    setPlayersData(data.players);

    setGame(game + 1);
  };

  return (
    <div className="bg-blue-500">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Tennis Trivia - Next.js Netlify</span>
        </h2>

        <Game
          key={game}
          playersData={playersData}
          nextGame={nextGame}
        />

      </div>
    </div>
  );
}