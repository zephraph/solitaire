import { memo } from "react";
import { Box } from "ink";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

interface CardSlotProps {
  isHighlighted?: boolean;
}

export const CardSlot = memo(({ isHighlighted = false }: CardSlotProps) => {
  return (
    <Box
      borderStyle="single"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexDirection="column"
      borderColor={isHighlighted ? "yellow" : "gray"}
    ></Box>
  );
});
