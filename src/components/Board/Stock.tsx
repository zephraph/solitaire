/*

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐
  │   ││   │     │   ││   ││   ││   │
  └─▲─┘└───┘     └───┘└───┘└───┘└───┘
    └────────────────────────────────────Stock
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐
  │   ││   ││   ││   ││   ││   ││   │
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘

*/

import { useAtomValue } from "jotai";
import { cardAreaAtom, highlightedAreaAtom } from "../../store";
import { CardFaceDown } from "../Card";
import CardSlot from "../CardSlot";

function Stock() {
  const stock = useAtomValue(cardAreaAtom("stock"));
  const highlighted = useAtomValue(highlightedAreaAtom).area === "stock";

  return stock.length > 0 ? <CardFaceDown highlighted={highlighted} /> : <CardSlot highlighted={highlighted} />;
}

export default Stock;
