import { Dispatch, SetStateAction, createContext } from "react";

export const GAME_CONFIG = {
  NUMBER_OF_ROUNDS: 5,
};

type Status = {
  status: string;
  country: string;
};

export type GameState = {
  currentStep: number;
  score: number;
  pickedCountry: string;
  status: Status | null;
};

export type GameStateProps = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
};

export const initialGameState: GameState = {
  currentStep: 0,
  score: 0,
  pickedCountry: "",
  status: null,
};

export type GameStateContextType = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
};

export const GameStateContext = createContext<GameStateContextType>({
  gameState: initialGameState,
  setGameState: () => {},
});
