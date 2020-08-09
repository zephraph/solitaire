import { Suit, Rank } from "./components/Card";
import { CardState } from "./state";

export function shuffle<T>(items: T[]) {
  let remaining = items.length;
  let current;
  let temp;

  while (remaining) {
    current = Math.floor(Math.random() * remaining--);

    temp = items[remaining];
    items[remaining] = items[current];
    items[current] = temp;
  }

  return items;
}

export function generateDeck(shuffled: boolean = true) {
  const deck: CardState[] = [];
  for (let suit in Suit) {
    for (let rank in Rank) {
      deck.push({ suit: Suit[suit], rank: Rank[rank], faceUp: false });
    }
  }
  return shuffled ? shuffle(deck) : deck;
}
