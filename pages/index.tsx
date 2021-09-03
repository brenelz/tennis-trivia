import { useEffect, useRef, useState } from "react";
import { Player, uniqueCountries, top100Players } from "../lib/players";

type HomeProps = {
  players: Player[];
  countries: string[];
};

export default function Home({ players, countries }: HomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedCountry, setPickedCountry] = useState("");
  const [playersData, setPlayersData] = useState(players);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);

  const player = playersData[currentStep];

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

  useEffect(() => {
    inputRef?.current?.focus();
  }, [currentStep]);

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

            {status && (
              <div className="mt-4 text-lg leading-6 text-white">
                <p>
                  You are {status.status}. It is {status.country}{" "}
                </p>
                <p>
                  <button
                    autoFocus
                    onClick={nextStep}
                    className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
                  >
                    Next Player
                  </button>
                </p>
              </div>
            )}

            {!status && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  guessCountry();
                }}
              >
                <input
                  list="countries"
                  type="text"
                  value={pickedCountry}
                  onChange={(e) => setPickedCountry(e.target.value)}
                  ref={inputRef}
                  className="p-2 outline-none"
                  placeholder="Choose Country"
                />
                <datalist id="countries">
                  {countries.map((country, i) => (
                    <option key={i}>{country}</option>
                  ))}
                </datalist>
                <p>
                  <button
                    className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
                    type="submit"
                  >
                    Guess
                  </button>
                </p>
              </form>
            )}

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
      players: top5Players,
      countries: uniqueCountries,
    },
  };
}
