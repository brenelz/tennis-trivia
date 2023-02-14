import { useState } from "react";
import { Player } from "../lib/players"
import GameStep from "./GameStep"

type PlayGameProps = {
    player: Player;
    currentStep: number;
    nextStep: () => void;
}
export default function PlayGame({ player, currentStep, nextStep }: PlayGameProps) {
    const [score, setScore] = useState(0);

    const increaseScore = () => {
        setScore(score + 1);
    }

    return (
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
    )
}