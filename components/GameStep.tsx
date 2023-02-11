import { useState } from "react";
import GameForm from "./GameForm";
import GuessResult from "./GuessResult";

export type Result = 'correct' | 'incorrect';

type GameStepProps = {
    playerCountry: string;
    nextStep: () => void;
    increaseScore: () => void;
}

export default function GameStep({ playerCountry, nextStep, increaseScore }: GameStepProps) {
    const [result, setResult] = useState<Result>(null);

    const guessCountry = (pickedCountry) => {
        if (playerCountry.toLowerCase() === pickedCountry.toLowerCase()) {
            setResult("correct");
            increaseScore();
        } else {
            setResult("incorrect");
        }
    };

    if (result) {
        return <GuessResult result={result} nextStep={nextStep} country={playerCountry} />;
    }

    return (
        <GameForm guessCountry={guessCountry} />
    );
}