import { Box, Text, Spacer, BoxProps } from "ink";
import { memo } from "react";
import { Card as CardType, Suit } from "../types";
import React from "react";

export const CARD_WIDTH = 10;
export const CARD_HEIGHT = 7;

interface CardProps extends CardType, BoxProps {
  isHighlighted: boolean;
  isSelected: boolean;
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

export const Card = memo(
  ({
    rank,
    suit,
    text,
    face,
    isHighlighted,
    isSelected,
    ...boxProps
  }: CardProps) => {
    const color =
      suit === Suit.Hearts || suit === Suit.Diamonds ? "red" : undefined;

    return face === "down" ? (
      <CardFaceDown highlighted={isHighlighted} {...boxProps} />
    ) : (
      <Box
        borderStyle={isSelected ? "bold" : "round"}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        flexDirection="column"
        borderColor={
          (isHighlighted && "yellow") || (isSelected && "green") || undefined
        }
        {...boxProps}
      >
        <Box>
          <Text color={color}>
            {text}
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
          <Text color={color}>{text}</Text>
        </Box>
      </Box>
    );
  }
);
