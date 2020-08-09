import React, { FC } from "react";
import { Box, Spacer } from "ink";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

interface CardSlotProps {
  selected?: boolean;
}

function CardSlot({ selected = false }: CardSlotProps) {
  return (
    <Box
      borderStyle="single"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexDirection="column"
      borderColor={selected ? "yellow" : "gray"}
    ></Box>
  );
}

export default CardSlot;
