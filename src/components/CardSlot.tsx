import React from "react";
import { CARD_WIDTH, CARD_HEIGHT } from "./Card";

interface CardSlotProps {
  highlighted?: boolean;
}

function CardSlot({ highlighted = false }: CardSlotProps) {
  return (
    <box
      border
      borderStyle="single"
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      style={{ flexDirection: "column" }}
    ></box>
  );
}

export default CardSlot;
