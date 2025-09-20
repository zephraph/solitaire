import { cloneDeep as clone } from "es-toolkit";
import { findLast } from "es-toolkit/compat";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Rank, Suit } from "./components/Card";
import { generateDeck, getTableauCardFromHighlight } from "./helpers";

export type CardArea = "stock" | "waste" | "foundation" | "tableau";

export interface CardState {
  rank: Rank;
  suit: Suit;
  faceUp: boolean;
  area: CardArea;
  position: number;
  selected?: boolean;
}

export type HighlightedArea =
  | { area: "stock" | "waste"; position: 0 }
  | { area: "foundation"; position: number }
  | { area: "tableau"; position: number; index: number };

type CardStackLocation = {
  area: CardArea;
  position: number;
};

// Main deck atom - source of truth for all cards
export const deckAtom = atom<CardState[]>(
  generateDeck().map((card, index) => {
    if (index < 24) {
      return {
        ...card,
        position: 0,
        area: "stock" as CardArea,
      };
    }
    const base = index - 23;
    return {
      ...card,
      area: "tableau" as CardArea,
      faceUp: base === 1 || base === 3 || base === 6 || base === 10 || base === 15 || base === 21 || base === 28,
      position: base === 1 ? 0 : base <= 3 ? 1 : base <= 6 ? 2 : base <= 10 ? 3 : base <= 15 ? 4 : base <= 21 ? 5 : 6,
    };
  })
);

// Highlighted area atom
export const highlightedAreaAtom = atom<HighlightedArea>({
  area: "stock",
  position: 0,
});

// Derived atom for cards by area
export const cardAreaAtom = atomFamily((area: CardArea) =>
  atom(
    (get) => get(deckAtom).filter((card) => card.area === area),
    (get, set, newValue: CardState[]) => {
      const deck = clone(get(deckAtom));
      const filteredDeck = deck.filter((card) => card.area !== area);
      const updatedCards = clone(newValue).map((card) => ({
        ...card,
        area,
      }));
      set(deckAtom, [...filteredDeck, ...updatedCards]);
    }
  )
);

// Derived atom for card stacks
export const cardStackAtom = atomFamily((location: CardStackLocation | undefined) =>
  atom(
    (get) => {
      if (!location) return [];
      return get(cardAreaAtom(location.area)).filter((card) => card.position === location.position);
    },
    (get, set, newStackState: CardState[]) => {
      if (!location) return;
      const deck = clone(get(deckAtom));
      const filteredDeck = deck.filter((card) => !(card.area === location.area && card.position === location.position));
      set(deckAtom, [...filteredDeck, ...newStackState]);
    }
  )
);

// Selected card atom
export const selectedCardAtom = atom(
  (get) => get(deckAtom).find((card) => card.selected),
  (get, set, cardToSelect: CardState | null) => {
    const deck = clone(get(deckAtom));

    // Clear all selections first
    deck.forEach((card) => (card.selected = false));

    if (cardToSelect) {
      const selectedCardIndex = deck.findIndex(
        (card) => card.rank === cardToSelect.rank && card.suit === cardToSelect.suit
      );
      if (selectedCardIndex !== -1) {
        deck[selectedCardIndex] = { ...cardToSelect, selected: true };
      }
    }

    set(deckAtom, deck);
  }
);

// Highlighted card atom
export const highlightedCardAtom = atom(
  (get) => {
    const deck = get(deckAtom);
    const highlighted = get(highlightedAreaAtom);

    if (highlighted.area === "stock" || highlighted.area === "waste") {
      return findLast(deck, (card) => card.area === highlighted.area);
    }

    if (highlighted.area === "foundation") {
      return findLast(deck, (card) => card.area === "foundation" && card.position === highlighted.position);
    }

    return getTableauCardFromHighlight(
      deck.filter((card) => card.area === "tableau"),
      highlighted
    );
  },
  (get, set, newCard: CardState) => {
    const deck = clone(get(deckAtom));
    const cardIndex = deck.findIndex((card) => card.suit === newCard.suit && card.rank === newCard.rank);
    if (cardIndex !== -1) {
      deck[cardIndex] = newCard;
      set(deckAtom, deck);
    }
  }
);
