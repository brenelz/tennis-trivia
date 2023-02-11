import { Result } from "./GameStep"

type GuessResultProps = {
    result: Result,
    nextStep: () => void;
    country: string;
}
export default function GuessResult({ result, nextStep, country }: GuessResultProps) {
    return (
        <div className="mt-4 text-lg leading-6 text-white">
            <p>
                You are {result}. It is {country}{" "}
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
    )
}