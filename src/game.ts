import { enumKeys, last, randomInt, shuffle } from "./utils";
import { CardSelection, CardHighlight, Card, Suit, Rank } from "./types";
import { createStore } from "@zephraph/mutik";
import onExit from "signal-exit";

import fs from "fs";
import path from "path";
import os from "os";

const SAVE_PATH = path.join(os.tmpdir(), ".solitaire-data");

export interface GameState {
  readonly seed: number;
  selected?: CardSelection;
  highlighted: CardHighlight;
  stock: Card[];
  waste: Card[];
  foundation: [Card[], Card[], Card[], Card[]];
  tableau: [Card[], Card[], Card[], Card[], Card[], Card[], Card[]];
}

export const createInitialState = (seed: number = randomInt()): GameState => {
  const deck: Card[] = [];
  for (let suit of enumKeys(Suit)) {
    for (let rank of enumKeys(Rank)) {
      deck.push({
        suit: Suit[suit],
        rank: Rank[rank],
        text: `${Rank[rank]}${Suit[suit]}`,
        face: "down",
      });
    }
  }

  shuffle(deck, seed);

  const stock = deck.splice(0, 23);
  const tableau = Array(7)
    .fill(null)
    .map((_, index) => {
      const stack = deck.splice(0, index + 1);
      last(stack)!.face = "up";
      return stack;
    }) as GameState["tableau"];

  return {
    seed,
    stock,
    waste: [],
    tableau,
    foundation: [[], [], [], []],
    highlighted: {
      card: last(stock),
      area: "stock",
      position: 0,
      index: stock.length - 1,
    },
  };
};

export const [gameState, useGameState] = createStore<GameState>(
  createInitialState()
);

onExit(() => {
  fs.writeFileSync(SAVE_PATH, JSON.stringify(gameState.get()), "utf-8");
});

export const oldSave =
  fs.existsSync(SAVE_PATH) && fs.readFileSync(SAVE_PATH, { encoding: "utf-8" });
