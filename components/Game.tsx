import { useState } from "react";
import { Player } from "../lib/players";
import PlayGame from "../components/PlayGame";

type GameProps = {
    playersData: Player[];
    nextGame: () => void;
};

export default function Game({ playersData, nextGame }: GameProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const player = playersData[currentStep];

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (player ? (
        <PlayGame player={player} currentStep={currentStep} nextStep={nextStep} />
    ) : (
        <div>
            <button
                autoFocus
                onClick={nextGame}
                className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
                Play Again
            </button>
        </div>
    ));
}