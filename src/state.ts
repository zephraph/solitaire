import { atom, selector, DefaultValue, selectorFamily } from "recoil";
import { Rank, Suit } from "./components/Card";
import { generateDeck } from "./actions";

const deck = generateDeck();

export interface CardState {
  rank: Rank;
  suit: Suit;
  faceUp: boolean;
}

export const stockState = atom<CardState[]>({
  key: "stockState",
  default: deck.splice(28),
});

export const wasteState = atom<CardState[]>({
  key: "wasteState",
  default: [],
});

export const foundationState = atom<
  [CardState[], CardState[], CardState[], CardState[]]
>({
  key: "foundationState",
  default: [[], [], [], []],
});

export const tableauState = atom<CardState[][]>({
  key: "tableau",
  default: Array(7)
    .fill(undefined)
    .map((_, i) => deck.splice(0, i + 1))
    .map((stack, i) => {
      stack[i].faceUp = true;
      return stack;
    }),
});

export type SelectionCoord = { x: number; y: number };

const selectionCoords = atom<SelectionCoord>({
  key: "activeCard",
  default: { x: 0, y: 0 },
});

export const selectionState = selector<SelectionCoord>({
  key: "selectionState",
  get({ get }) {
    return get(selectionCoords);
  },
  set({ get, set }, nextCard) {
    if (nextCard instanceof DefaultValue) {
      set(selectionCoords, { x: 0, y: 0 });
      return;
    }
    const { x, y } = get(selectionCoords);
    let nextX = nextCard.x;
    let nextY = nextCard.y;

    if (nextX < 0) {
      nextX = 6;
    } else if (nextX > 6) {
      nextX = 0;
    } else if (nextX === 2 && nextY === 0 && nextX - x > 0) {
      nextX = 3;
    } else if (nextX === 2 && nextY === 0 && nextX - x < 0) {
      nextX = 1;
    }

    const columnLength = get(tableauState)[nextX].length;

    if (nextX === 2 && y === 1 && nextY - y < 0) {
      nextY = columnLength + 1;
    }

    if (nextX === 2 && y === columnLength + 1 && nextY - y > 0) {
      nextY = 1;
    }

    if (nextY < 0 || (nextY > columnLength + 1 && nextX !== nextCard.x)) {
      nextY = columnLength + 1;
    }

    if (nextY > columnLength + 1) {
      nextY = 0;
    }

    set(selectionCoords, { x: nextX, y: nextY });
  },
});

type Stock = { area: "stock" };
type Waste = { area: "waste" };
type Foundation = { area: "foundation"; position: 0 | 1 | 2 | 3 };
type Tableau = {
  area: "tableau";
  position: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  index: number;
};

type SelectionArea = Stock | Waste | Foundation | Tableau;

export const selectionAreaState = selector<SelectionArea>({
  key: "selectionAreaState",
  get({ get }) {
    const { x, y } = get(selectionCoords);
    if (x === 0 && y === 0) {
      return { area: "stock" };
    }
    if (x === 1 && y === 0) {
      return { area: "waste" };
    }
    if (y === 0) {
      return { area: "foundation", position: x - 3 };
    }
    return { area: "tableau", position: x, index: y };
  },
});

export const selectedState = selectorFamily<boolean[], SelectionArea["area"]>({
  key: "selectedState",
  get: (area) => ({ get }) => {
    const currentArea = get(selectionAreaState);
    if (area === currentArea.area) {
      if (currentArea.area === "stock" || currentArea.area === "waste") {
        return [true];
      }
      if (currentArea.area === "foundation") {
        return Array(4)
          .fill(false)
          .map((_, i) => (i === currentArea.position ? true : false));
      }
      if (currentArea.area === "tableau") {
        const columnLength = get(tableauState)[currentArea.position].length;
        const cols = Array(7);
        cols[currentArea.position] = Array(columnLength || 1)
          .fill(false)
          .map((_, i) => i + 1 === currentArea.index);
        return cols;
      }
    }
    return [false];
  },
});
