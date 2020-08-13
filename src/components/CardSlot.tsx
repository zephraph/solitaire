import React from "react";
import { Box } from "ink";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

interface CardSlotProps {
  highlighted?: boolean;
}

function CardSlot({ highlighted = false }: CardSlotProps) {
  return (
    <Box
      borderStyle="single"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexDirection="column"
      borderColor={highlighted ? "yellow" : "gray"}
    ></Box>
  );
}

export default CardSlot;
