import { Player } from "../lib/players";
import { SetStateAction, useEffect, useRef, useState } from "react";

type PlayerCardProps = {
  countries: string[];
  player: Player | undefined;
  score: number;
  currentStep: number;
  nextStep: () => void;
  guessCountry: () => void;
  setPickedCountry: (value: SetStateAction<string>) => void;
  pickedCountry: string;
  status: {
    status: string;
    country: string;
  } | null;
};

export default function PlayerCard({
  countries,
  player,
  score,
  currentStep,
  nextStep,
  guessCountry,
  setPickedCountry,
  pickedCountry,
  status,
}: PlayerCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [currentStep]);

  return (
    <div>
      <p className="mt-4 text-lg leading-6 text-blue-200">
        What country is the following tennis player from?
      </p>
      <h2 className="text-lg font-extrabold text-white my-5">
        {player?.full_name}
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
  );
}
