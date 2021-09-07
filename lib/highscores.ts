import { supabase } from "./supabase";

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
