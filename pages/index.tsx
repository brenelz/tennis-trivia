import { useEffect, useRef, useState } from "react";
import { Player, uniqueCountries, top100Players } from "../lib/players";
import GameCompleted from "../components/GameCompleted";

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
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [currentStep]);

  return (
    <div>
      <h1>Tennis Trivia - Next.js Netlify</h1>
      <h2>Current score: {score}</h2>
      {player ? (
        <div>
          <h2>{player.full_name}</h2>

          {status && (
            <div>
              You are {status.status}. It is {status.country}{" "}
              <button autoFocus onClick={nextStep}>
                Next
              </button>
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
              />
              <datalist id="countries">
                {countries.map((country) => (
                  <option>{country}</option>
                ))}
              </datalist>
              <button type="submit">Guess Country</button>
            </form>
          )}
        </div>
      ) : (
        <GameCompleted playAgain={playAgain} />
      )}
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
