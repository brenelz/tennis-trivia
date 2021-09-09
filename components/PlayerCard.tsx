import { Player } from "../lib/players";
import { useContext, useEffect, useRef } from "react";
import { GameStateContext } from "../lib/game";

type PlayerCardProps = {
  countries: string[];
  player: Player | undefined;
};

export default function PlayerCard({ countries, player }: PlayerCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { gameState, setGameState } = useContext(GameStateContext);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [gameState.currentStep]);

  const guessCountry = () => {
    if (
      player?.country.toLowerCase() === gameState.pickedCountry.toLowerCase()
    ) {
      setGameState({
        ...gameState,
        status: {
          status: "correct",
          country: player?.country,
        },
        score: gameState.score + 1,
      });
    } else {
      setGameState({
        ...gameState,
        status: {
          status: "incorrect",
          country: player?.country || "",
        },
      });
    }
  };

  const nextStep = () => {
    setGameState({
      ...gameState,
      pickedCountry: "",
      currentStep: gameState.currentStep + 1,
      status: null,
    });
  };

  return (
    <div>
      <p className="mt-4 text-lg leading-6 text-blue-200">
        What country is the following tennis player from?
      </p>
      <h2 className="text-lg font-extrabold text-white my-5">
        {player?.full_name}
      </h2>

      {gameState.status && (
        <div className="mt-4 text-lg leading-6 text-white">
          <p>
            You are {gameState?.status?.status}. It is{" "}
            {gameState?.status?.country}{" "}
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

      {!gameState.status && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            guessCountry();
          }}
        >
          <input
            list="countries"
            type="text"
            value={gameState.pickedCountry}
            onChange={(e) =>
              setGameState({
                ...gameState,
                pickedCountry: e.target.value,
              })
            }
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
        <strong>Current score:</strong> {gameState.score}
      </p>
    </div>
  );
}
