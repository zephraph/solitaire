import React from "react";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

interface CardSlotProps {
  highlighted?: boolean;
}

function CardSlot({ highlighted = false }: CardSlotProps) {
  return (
    <box
      flexDirection="column"
      border
      borderStyle="single"
      borderColor={highlighted ? "yellow" : "white"}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
    ></box>
  );
}

export default CardSlot;
