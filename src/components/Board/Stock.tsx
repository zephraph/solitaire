/*

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐
  │   ││   │     │   ││   ││   ││   │
  └─▲─┘└───┘     └───┘└───┘└───┘└───┘
    └────────────────────────────────────Stock
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐
  │   ││   ││   ││   ││   ││   ││   │
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘

*/

import React, { FC, JSX } from "react";
import CardSlot from "../CardSlot";
import { useAtomValue } from "jotai";
import { CardFaceDown } from "../Card";
import { cardAreaAtom, highlightedAreaAtom } from "../../store";

function Stock() {
  const stock = useAtomValue(cardAreaAtom("stock"));
  const highlighted = useAtomValue(highlightedAreaAtom).area === "stock";

  return stock.length > 0 ? (
    <CardFaceDown highlighted={highlighted} />
  ) : (
    <CardSlot highlighted={highlighted} />
  );
}

export default Stock;
