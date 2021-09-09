import { useEffect, useRef, useState } from "react";
import {
  Player,
  uniqueCountries,
  top100Players,
  getPlayers,
} from "../lib/players";
import { getHighScores, Highscore } from "../lib/highscores";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { GAME_CONFIG } from "../lib/game";
import GameCompleted from "../components/GameCompleted";
import PlayerCard from "../components/PlayerCard";
import { GetServerSideProps } from "next";
import { useQuery, useQueryClient } from "react-query";

type GameProps = {
  countries: string[];
};

type Status = {
  status: string;
  country: string;
};

export default function Game({ countries }: GameProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedCountry, setPickedCountry] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const queryClient = useQueryClient();

  const players = useQuery<Player[]>("players", getPlayers);

  const player = players.data && players.data[currentStep];

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      router.push("/");
    }
  }, [router]);

  const guessCountry = () => {
    if (player?.country.toLowerCase() === pickedCountry.toLowerCase()) {
      setStatus({ status: "correct", country: player.country });
      setScore(score + 1);
    } else {
      setStatus({ status: "incorrect", country: player?.country || "" });
    }
  };

  const nextStep = () => {
    setPickedCountry("");
    setCurrentStep(currentStep + 1);
    setStatus(null);
  };

  const playAgain = async () => {
    setPickedCountry("");
    setCurrentStep(0);
    setScore(0);
    queryClient.invalidateQueries("players");
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
          <GameCompleted score={score} playAgain={playAgain} />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      countries: uniqueCountries,
    },
  };
};
