import { NextApiRequest, NextApiResponse } from "next"
import { top100Players } from "../../lib/players";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random());
  const top5Players = randomizedPlayers.slice(0, 5);
  res.status(200).json({players: top5Players});
}
