import { useEffect, useRef, useState } from "react";
import { Player, uniqueCountries, top100Players } from "../lib/players";
import { getHighScores, Highscore } from "../lib/highscores";
import Highscores from "../components/Highscores";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { GAME_CONFIG } from "../lib/game";
import { User } from "../lib/users";

type HomeProps = {
  players: Player[];
  countries: string[];
  highscores: Highscore[];
};

export default function Home({ players, countries, highscores }: HomeProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedCountry, setPickedCountry] = useState("");
  const [playersData, setPlayersData] = useState(players);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [highscoresData, setHighscoresData] = useState(highscores);
  const [submittedHighscore, setSubmittedHighscore] = useState(false);

  const player = playersData[currentStep];

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      router.push("/");
    }
    async function getName() {
      const { data } = await supabase
        .from<User>("users")
        .select("name")
        .eq("id", session.user.id);
      if (data) {
        setName(data[0].name);
      }
    }
    getName();
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
    setSubmittedHighscore(false);
  };

  const submitHighscore = async () => {
    const session = supabase.auth.session();
    await supabase.from("users").upsert({ id: session.user.id, name });
    await supabase.from("highscores").insert([
      {
        user_id: session.user.id,
        num_correct: score,
        num_total: GAME_CONFIG.NUMBER_OF_ROUNDS,
      },
    ]);
    const highscores = await getHighScores();
    setHighscoresData(highscores);
    setSubmittedHighscore(true);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [currentStep]);

  return (
    <div>
      <div>
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
            {!submittedHighscore && (
              <p>
                <input
                  list="countries"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 outline-none my-5"
                  placeholder="Enter name"
                />{" "}
                <button
                  autoFocus
                  onClick={submitHighscore}
                  className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                >
                  Submit Highscore
                </button>
              </p>
            )}
            <p>
              <button
                autoFocus
                onClick={playAgain}
                className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
              >
                Play Again
              </button>
            </p>
          </div>
        )}
      </div>

      <Highscores highscores={highscoresData} />
    </div>
  );
}

export async function getServerSideProps() {
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
}
