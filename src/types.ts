export type CardArea = "stock" | "waste" | "foundation" | "tableau";

export enum Rank {
  Ace = "A",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
}

export enum Suit {
  Hearts = "♥",
  Diamonds = "♦",
  Spades = "♠",
  Clubs = "♣",
}

export interface Card {
  rank: Rank;
  suit: Suit;
  key: `${Rank}${Suit}`;
  face: "up" | "down";
}

export interface CardSelection {
  card: Card;
  area: CardArea;
  position: number;
  index: number;
}

export interface CardHighlight {
  card?: Card;
  area: CardArea;
  position: number;
  index: number;
}
