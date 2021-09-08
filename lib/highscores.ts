import { supabase } from "../utils/supabase";
import { GAME_CONFIG } from "./game";

export type Highscore = {
  id: number;
  num_correct: number;
  num_total: number;
  users: { name: string };
};

export const getHighScores = async () => {
  let { data: highscores } = await supabase
    .from<Highscore>("highscores")
    .select(
      `
        id,
        num_correct, 
        num_total,
        users (
            name
        )
    `
    )
    .order("num_correct", { ascending: false })
    .limit(10);

  return highscores;
};

export const addHighscore = async (
  user_id: string,
  name: string,
  score: number
) => {
  await supabase.from("users").upsert({ id: user_id, name });
  await supabase.from("highscores").insert([
    {
      user_id: user_id,
      num_correct: score,
      num_total: GAME_CONFIG.NUMBER_OF_ROUNDS,
    },
  ]);
};
