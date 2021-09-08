import { useEffect, useRef, useState } from "react";
import { Player, uniqueCountries, top100Players } from "../lib/players";
import { getHighScores, Highscore } from "../lib/highscores";
import Highscores from "../components/Highscores";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { GAME_CONFIG } from "../lib/game";
import GameCompleted from "../components/GameCompleted";
import PlayerCard from "../components/PlayerCard";
import { GetServerSideProps } from "next";

type GameProps = {
  players: Player[];
  countries: string[];
  highscores: Highscore[];
};

type Status = {
  status: string;
  country: string;
};

export default function Game({ players, countries, highscores }: GameProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [playersData, setPlayersData] = useState(players);
  const [pickedCountry, setPickedCountry] = useState("");
  const [highscoresData, setHighscoresData] = useState(highscores);
  const [status, setStatus] = useState<Status | null>(null);

  const player = playersData[currentStep];

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      router.push("/");
    }
  }, []);

  const guessCountry = () => {
    if (player.country.toLowerCase() === pickedCountry.toLowerCase()) {
      setStatus({ status: "correct", country: player.country });
      setScore(score + 1);
    } else {
      setStatus({ status: "incorrect", country: player.country });
    }
  };

  const nextStep = () => {
    setPickedCountry("");
    setCurrentStep(currentStep + 1);
    setStatus(null);
  };

  const playAgain = async () => {
    setPickedCountry("");
    setPlayersData([]);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/newGame"
    );
    const data = await response.json();
    setPlayersData(data.players);
    setCurrentStep(0);
    setScore(0);
  };

  return (
    <div>
      <div>
        {player ? (
          <PlayerCard
            countries={countries}
            player={player}
            score={score}
            guessCountry={guessCountry}
            currentStep={currentStep}
            nextStep={nextStep}
            setPickedCountry={setPickedCountry}
            status={status}
            pickedCountry={pickedCountry}
          />
        ) : (
          <GameCompleted
            score={score}
            setHighscoresData={setHighscoresData}
            playAgain={playAgain}
          />
        )}
      </div>

      <Highscores highscores={highscoresData} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random());
  const top5Players = randomizedPlayers.slice(0, GAME_CONFIG.NUMBER_OF_ROUNDS);
  const highscores = await getHighScores();

  return {
    props: {
      players: top5Players,
      countries: uniqueCountries,
      highscores,
    },
  };
};
