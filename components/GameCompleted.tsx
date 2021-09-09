import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "../utils/supabase";
import { addHighscore, getHighScores, Highscore } from "../lib/highscores";
import { getLoggedinUsersName } from "../lib/users";
import { useQueryClient } from "react-query";

type GameCompletedProps = {
  score: number;
  playAgain: () => Promise<void>;
};

export default function GameCompleted({
  score,
  playAgain,
}: GameCompletedProps) {
  const [submittedHighscore, setSubmittedHighscore] = useState(false);
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    async function getName() {
      const session = supabase.auth.session();
      if (session && session.user) {
        const name = await getLoggedinUsersName(session.user.id);
        if (name) {
          setName(name);
        }
      }
    }
    getName();
  }, []);

  const submitHighscore = async () => {
    const session = supabase.auth.session();
    if (session && session.user) {
      await addHighscore(session.user.id, name, score);

      const highscores = await getHighScores();
      if (highscores) {
        queryClient.invalidateQueries("highscores");
        setSubmittedHighscore(true);
      }
    }
  };

  const playAgain2 = () => {
    setSubmittedHighscore(false);
    playAgain();
  };

  return (
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
          onClick={playAgain2}
          className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Play Again
        </button>
      </p>
    </div>
  );
}
