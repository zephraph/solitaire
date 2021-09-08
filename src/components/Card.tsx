import { Box, Text, Spacer, BoxProps } from "ink";
import { Card as CardType, Rank, Suit } from "../types";

export const CARD_WIDTH = 10;
export const CARD_HEIGHT = 7;

interface CardProps extends CardType, BoxProps {
  selected: boolean;
  highlighted: boolean;
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

function Card({
  rank,
  suit,
  face,
  highlighted,
  selected,
  ...boxProps
}: CardProps) {
  const color =
    suit === Suit.Hearts || suit === Suit.Diamonds ? "red" : undefined;

  return face === "down" ? (
    <CardFaceDown highlighted={highlighted} {...boxProps} />
  ) : (
    <Box
      borderStyle={selected ? "bold" : "round"}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexDirection="column"
      borderColor={
        (highlighted && "yellow") || (selected && "green") || undefined
      }
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
