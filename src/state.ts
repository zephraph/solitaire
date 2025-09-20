import { atom, selector, DefaultValue, selectorFamily } from "recoil";
import { Rank, Suit } from "./components/Card";
import { generateDeck } from "./helpers";
import { cloneDeep as clone } from "es-toolkit";
import { findLast } from "es-toolkit";
import { getTableauCardFromHighlight } from "./helpers";

export type CardArea = "stock" | "waste" | "foundation" | "tableau";

export interface CardState {
  rank: Rank;
  suit: Suit;
  faceUp: boolean;
  area: CardArea;
  position: number;
  selected?: boolean;
}

/**
 * Represents the source of truth for all cards in the deck. Direct
 * access to this state can simply actions such as movement on the board.
 */
export const deckState = atom<CardState[]>({
  key: "deckState",
  default: generateDeck().map((card, index) => {
    if (index < 24) {
      return {
        ...card,
        position: 0,
        area: "stock",
      };
    }
    const base = index - 23;
    return {
      ...card,
      area: "tableau",
      faceUp:
        base === 1 ||
        base === 3 ||
        base === 6 ||
        base === 10 ||
        base === 15 ||
        base === 21 ||
        base === 28,
      position:
        base === 1
          ? 0
          : base <= 3
          ? 1
          : base <= 6
          ? 2
          : base <= 10
          ? 3
          : base <= 15
          ? 4
          : base <= 21
          ? 5
          : 6,
    };
  }),
});

export const cardAreaState = selectorFamily<CardState[], CardArea>({
  key: "stackState",
  get: (area) => ({ get }) =>
    get(deckState).filter((card) => card.area === area),
  set: (area) => ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    set(
      deckState,
      clone(get(deckState))
        .filter((card) => card.area !== area)
        .concat(
          clone(newValue).map((card) => {
            card.area = area;
            return card;
          })
        )
    );
  },
});

type CardStackLocation = {
  area: CardArea;
  position: number;
};
export const cardStackState = selectorFamily<CardState[], CardStackLocation>({
  key: "cardStackState",
  get: (location) => ({ get }) => {
    if (!location) return;
    return get(cardAreaState(location.area)).filter(
      (card) => card.position === location.position
    );
  },
  set: (location) => ({ get, set }, newStackState) => {
    if (!location) return;
    const deck = clone(get(deckState));
    set(
      deckState,
      deck
        .filter(
          (card) =>
            !(
              card.area === location.area && card.position === location.position
            )
        )
        .concat(newStackState)
    );
  },
});

export const selectedCardState = selector<CardState>({
  key: "selectedCardState",
  get: ({ get }) => get(deckState).find((card) => card.selected),
  set: ({ get, set }, cardToSelect) => {
    if (cardToSelect instanceof DefaultValue) return;

    const deck: CardState[] = clone(get(deckState)).map((card: CardState) => ({
      ...card,
      selected: false,
    }));
    const selectedCardIndex = deck.findIndex(
      (card) =>
        card.rank === cardToSelect.rank && card.suit === cardToSelect.suit
    );
    deck.splice(selectedCardIndex, 1, { ...cardToSelect, selected: true });
    set(deckState, deck);
  },
});

export type HighlightedArea =
  | { area: "stock" | "waste"; position: 0 }
  | { area: "foundation"; position: number }
  | { area: "tableau"; position: number; index: number };
export const highlightedAreaState = atom<HighlightedArea>({
  key: "highlightedAreaState",
  default: { area: "stock", position: 0 },
});

export const highlightedCardState = selector<CardState>({
  key: "highlightedCardState",
  get: ({ get }) => {
    const deck = get(deckState);
    const highlighted = get(highlightedAreaState);
    if (highlighted.area === "stock" || highlighted.area === "waste") {
      return findLast(deck, (card) => card.area === highlighted.area);
    }
    if (highlighted.area === "foundation") {
      return findLast(
        deck,
        (card) =>
          card.area === "foundation" && card.position === highlighted.position
      );
    }
    return getTableauCardFromHighlight(
      deck.filter((card) => card.area === "tableau"),
      highlighted
    );
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const deck = clone(get(deckState)) as CardState[];
    const cardIndex = deck.findIndex(
      (card) => card.suit === newValue.suit && card.rank === newValue.rank
    );
    deck[cardIndex] = newValue;
    set(deckState, deck);
  },
});
