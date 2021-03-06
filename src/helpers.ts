import { CardState, HighlightedArea, CardArea } from "./state";
import { Suit, Rank } from "./components/Card";
import { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import isEqual from "lodash/isEqual";

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
      deck.push({
        suit: Suit[suit],
        rank: Rank[rank],
        faceUp: false,
        area: "stock",
        position: 0,
      });
    }
  }
  return shuffled ? shuffle(deck) : deck;
}

export function useForceUpdate() {
  const [_, setValue] = useState(true); // state
  return () => setValue((value) => !value); // update the state to force render
}

export function removeCardFromTableau(tableau: CardState[][], card: CardState) {
  const tableauClone = cloneDeep(tableau);
  for (let stack of tableauClone) {
    const index = findIndex(stack, (c) => isEqual(c, card));
    if (index > -1) {
      stack.splice(index, 1);
      return tableauClone;
    }
  }
  return tableauClone;
}

export function isOppositeSuit(card1: CardState, card2: CardState) {
  if (
    (card1.suit === Suit.Hearts || card1.suit === Suit.Diamonds) &&
    (card2.suit === Suit.Clubs || card2.suit === Suit.Spades)
  ) {
    return true;
  } else if (
    (card2.suit === Suit.Hearts || card2.suit === Suit.Diamonds) &&
    (card1.suit === Suit.Clubs || card1.suit === Suit.Spades)
  ) {
    return true;
  } else {
    return false;
  }
}

export function isCardMovableToTableau(
  cardForBase: CardState,
  cardToMove: CardState
) {
  if (!isOppositeSuit(cardForBase, cardToMove)) return false;

  const ranks = Object.values(Rank);
  const baseRankIndex = ranks.indexOf(cardForBase.rank);
  if (baseRankIndex === 0) return false;

  const handRankIndex = ranks.indexOf(cardToMove.rank);
  if (baseRankIndex - handRankIndex !== 1) return false;

  return true;
}

export function isCardMovableToFoundation(
  cardForBase: CardState,
  cardToMove: CardState
) {
  if (cardForBase.suit !== cardToMove.suit) return false;

  const ranks = Object.values(Rank);
  const baseRankIndex = ranks.indexOf(cardForBase.rank);
  const handRankIndex = ranks.indexOf(cardToMove.rank);
  if (handRankIndex - baseRankIndex !== 1) return false;

  return true;
}

export function moveCardTo(
  cardToMove: CardState,
  location: { area: "tableau" | "foundation"; position: number }
) {
  if (location.area === "tableau") {
  } else {
  }
}

export const getStackFromTableau = (tableau: CardState[], position) =>
  tableau.filter((card) => card.position === position);

export const getTopTableauCardIndex = (tableau: CardState[], position) => {
  const stack = getStackFromTableau(tableau, position);
  return stack.length === 0 ? 0 : stack.length - 1;
};

export const getTableauCardFromHighlight = (
  tableau: CardState[],
  highlight: HighlightedArea
) => {
  if (highlight.area !== "tableau") return undefined;
  const stack = getStackFromTableau(tableau, highlight.position);
  return stack[highlight.index];
};

export const cardHasFaceUpCardsBelowIt = (
  stack: CardState[],
  cardIndex: number
) => {
  if (cardIndex < 1) return false;
  return stack[cardIndex - 1].faceUp;
};

export const cardHasFaceUpCardsAboveIt = (
  stack: CardState[],
  cardIndex: number
) => {
  const topIndex = stack.length === 0 ? 0 : stack.length - 1;
  if (topIndex === 0 || topIndex === cardIndex) return false;
  return stack[cardIndex + 1].faceUp;
};

export const cyclePosition = (direction: -1 | 1, value: number) => {
  return (value + direction + 7) % 7;
};
