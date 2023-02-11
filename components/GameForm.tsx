import { useEffect, useRef, useState } from "react";
import { uniqueCountries } from "../lib/players";

type GameFormProps = {
    guessCountry: (pickedCountry: string) => void;
};

export default function GameForm({ guessCountry }: GameFormProps) {
    const [pickedCountry, setPickedCountry] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                guessCountry(pickedCountry);
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
                {uniqueCountries.map((country, i) => (
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
    )
}