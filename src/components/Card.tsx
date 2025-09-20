import React from "react";

export const CARD_WIDTH = 10;
export const CARD_HEIGHT = 7;

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

interface CardProps {
  faceUp?: boolean;
  highlighted?: boolean;
  selected?: boolean;
  rank: Rank;
  suit: Suit;
}

interface CardFaceDownProps {
  highlighted?: boolean;
}
export function CardFaceDown({ highlighted = false }: CardFaceDownProps) {
  const color = highlighted ? "yellow" : "blue";
  return (
    <box
      border
      borderStyle="rounded"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      style={{ flexDirection: "column" }}
    >
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
      <text fg={color}>{"\u259A".repeat(8)}</text>
    </box>
  );
}

function Card(props: CardProps) {
  const {
    faceUp = false,
    rank,
    suit,
    highlighted = false,
    selected = false,
  } = props;
  const color =
    suit === Suit.Hearts || suit === Suit.Diamonds ? "red" : undefined;
  return !faceUp ? (
    <CardFaceDown highlighted={highlighted} />
  ) : (
    <box
      border
      borderStyle={selected ? "heavy" : "rounded"}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      style={{ flexDirection: "column" }}
    >
      <box>
        <text fg={color}>
          {rank}
          {suit}
          {"      "}
          {"      "}
          {"      "}
          {"      "}
          {"      "}
          {"      "}
        </text>
      </box>
      <box style={{ flexGrow: 1 }} />
      <box style={{ justifyContent: "flex-end" }}>
        <text fg={color}>
          {suit}
          {rank}
        </text>
      </box>
    </box>
  );
}

export default Card;
