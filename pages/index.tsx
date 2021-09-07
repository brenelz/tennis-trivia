import { useEffect, useRef, useState } from "react";
import { Player } from "../lib/players";
import { getHighScores, Highscore } from "../lib/highscores";
import Highscores from "../components/Highscores";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

type HomeProps = {
  highscores: Highscore[];
};

export default function Home({ highscores }: HomeProps) {
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      router.push("/game");
    }
  }, []);

  const signIn = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
  };
  return (
    <div>
      <div>
        <button
          autoFocus
          onClick={signIn}
          className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
        >
          Login to Play
        </button>
      </div>

      <Highscores highscores={highscores} />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const highscores = await getHighScores();

  return {
    props: {
      highscores,
    },
  };
}
