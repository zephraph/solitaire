import { atom, selector, DefaultValue } from "recoil";
import { Rank, Suit } from "./components/Card";

interface CardState {
	rank: Rank;
	suit: Suit;
	faceUp: boolean;
}

export const stockState = atom<CardState[]>({
	key: "stockState",
	default: [],
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

export const tableauState = atom<
	[
		CardState[],
		CardState[],
		CardState[],
		CardState[],
		CardState[],
		CardState[],
		CardState[]
	]
>({
	key: "tableau",
	default: [[], [], [], [], [], [], []],
});

export type Selection = { x: number; y: number };

const activeCard = atom<Selection>({
	key: "activeCard",
	default: { x: 0, y: 0 },
});

export const selectionState = selector<Selection>({
	key: "selectionState",
	get({ get }) {
		return get(activeCard);
	},
	set({ get, set }, nextCard) {
		if (nextCard instanceof DefaultValue) {
			set(activeCard, { x: 0, y: 0 });
			return;
		}
		let nextX = nextCard.x;
		let nextY = nextCard.y;

		if (nextCard.x < 0) {
			nextX = 7;
		} else if (nextCard.x > 7) {
			nextX = 0;
		}

		const columnLength = get(tableauState)[nextX].length;

		if (nextY < 0 || (nextY > columnLength + 1 && nextX !== nextCard.x)) {
			nextY = columnLength;
		}

		if (nextY > columnLength + 1) {
			nextY = 0;
		}

		set(activeCard, { x: nextX, y: nextY });
	},
});
