import { NextApiRequest, NextApiResponse } from "next";
import { top100Players } from "../../lib/players";
import { GAME_CONFIG } from "../../lib/game";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random());
  const fivePlayers = randomizedPlayers.slice(0, GAME_CONFIG.NUMBER_OF_ROUNDS);
  res.status(200).json({ players: fivePlayers });
};
