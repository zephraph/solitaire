import { enumKeys, last, randomInt, shuffle } from "./utils";
import { proxy } from "valtio";
import { CardSelection, CardHighlight, Card, Suit, Rank } from "./types";

interface GameState {
  readonly seed: number;
  selected?: CardSelection;
  highlighted: CardHighlight;
  stock: Card[];
  waste: Card[];
  foundation: [Card[], Card[], Card[], Card[], Card[], Card[], Card[]];
  tableau: [Card[], Card[], Card[], Card[]];
}

export const createInitialState = (seed: number = randomInt()): GameState => {
  const deck: Card[] = [];
  for (let suit of enumKeys(Suit)) {
    for (let rank of enumKeys(Rank)) {
      deck.push({
        suit: Suit[suit],
        rank: Rank[rank],
        key: `${Rank[rank]}${Suit[suit]}`,
        face: "down",
      });
    }
  }

  shuffle(deck, seed);

  const stock = deck.splice(0, 23);
  const foundation = Array(7)
    .fill(null)
    .map((_, index) => {
      const stack = deck.splice(0, index);
      last(stack)!.face = "up";
      return stack;
    }) as GameState["foundation"];

  return {
    seed,
    stock,
    waste: [],
    tableau: [[], [], [], []],
    foundation,
    highlighted: {
      card: last(stock),
      area: "stock",
      position: 0,
      index: stock.length - 1,
    },
  };
};

export const gameState = proxy<GameState>(createInitialState());
