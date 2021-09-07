import { Highscore } from "../lib/highscores";

type HighscoresProps = {
  highscores: Highscore[];
};

export default function Highscores({ highscores }: HighscoresProps) {
  return (
    <div className="md:absolute top-0 right-0 p-3 text-white text-center md:text-left">
      <h2 className="text-lg font-extrabold underline text-center">
        High Scores
      </h2>
      {highscores.length > 0 ? (
        highscores.map((highscore) => (
          <div key={highscore.id}>
            {highscore.users.name} - {highscore.num_correct}/
            {highscore.num_total}
          </div>
        ))
      ) : (
        <div>No highscores</div>
      )}
    </div>
  );
}
