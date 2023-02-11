import { useState } from "react";
import GameStep from "../components/GameStep";
import { Player, top100Players } from "../lib/players";

type HomeProps = {
  players: Player[];
  countries: string[];
};

export default function Home({ players }: HomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [playersData, setPlayersData] = useState(players);

  const player = playersData[currentStep];

  const increaseScore = () => {
    setScore(score + 1);
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const playAgain = async () => {
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
    <div className="bg-blue-500">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Tennis Trivia - Next.js Netlify</span>
        </h2>

        {player ? (
          <div>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              What country is the following tennis player from?
            </p>
            <h2 className="text-lg font-extrabold text-white my-5">
              {player.full_name}
            </h2>

            <GameStep
              key={currentStep}
              increaseScore={increaseScore}
              playerCountry={player.country}
              nextStep={nextStep}
            />

            <p className="mt-4 text-lg leading-6 text-white">
              <strong>Current score:</strong> {score}
            </p>
          </div>
        ) : (
          <div>
            <button
              autoFocus
              onClick={playAgain}
              className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random());
  const top5Players = randomizedPlayers.slice(0, 5);

  return {
    props: {
      players: top5Players
    },
  };
}
