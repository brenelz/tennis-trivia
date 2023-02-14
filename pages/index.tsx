import { useState } from "react";
import { Player, top100Players } from "../lib/players";
import PlayGame from "../components/PlayGame";

type HomeProps = {
  players: Player[];
  countries: string[];
};

export default function Home({ players }: HomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [playersData, setPlayersData] = useState(players);

  const player = playersData[currentStep];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const playAgain = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/newGame"
    );
    const data = await response.json();
    setPlayersData(data.players);
    setCurrentStep(0);
  };

  return (
    <div className="bg-blue-500">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Tennis Trivia - Next.js Netlify</span>
        </h2>

        {player ? (
          <PlayGame player={player} currentStep={currentStep} nextStep={nextStep} />
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
