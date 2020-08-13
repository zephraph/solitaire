import React from "react";
import { Box, Text, Spacer, BoxProps } from "ink";

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

interface CardProps extends BoxProps {
  faceUp?: boolean;
  highlighted?: boolean;
  selected?: boolean;
  rank: Rank;
  suit: Suit;
}

interface CardFaceDownProps extends BoxProps {
  highlighted?: boolean;
}
export function CardFaceDown({
  highlighted = false,
  ...boxProps
}: CardFaceDownProps) {
  const color = highlighted ? "yellow" : "blue";
  return (
    <Box
      borderStyle="round"
      borderColor={color}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexDirection="column"
      {...boxProps}
    >
      <Text color={color}>▚▚▚▚▚▚▚▚</Text>
      <Text color={color}>▚▚▚▚▚▚▚▚</Text>
      <Text color={color}>▚▚▚▚▚▚▚▚</Text>
      <Text color={color}>▚▚▚▚▚▚▚▚</Text>
      <Text color={color}>▚▚▚▚▚▚▚▚</Text>
    </Box>
  );
}

function Card(props: CardProps) {
  const {
    faceUp = false,
    rank,
    suit,
    highlighted = false,
    selected = false,
    ...boxProps
  } = props;
  const color = suit === Suit.Hearts || suit === Suit.Diamonds ? "red" : null;
  return !faceUp ? (
    <CardFaceDown highlighted={highlighted} {...boxProps} />
  ) : (
    <Box
      borderStyle={selected ? "bold" : "round"}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexDirection="column"
      borderColor={(highlighted && "yellow") || (selected && "green") || null}
      {...boxProps}
    >
      <Box>
        <Text color={color}>
          {rank}
          {suit}
          {"      "}
          {"      "}
          {"      "}
          {"      "}
          {"      "}
          {"      "}
        </Text>
      </Box>
      <Spacer />
      <Box justifyContent="flex-end">
        <Text color={color}>
          {suit}
          {rank}
        </Text>
      </Box>
    </Box>
  );
}

export default Card;
