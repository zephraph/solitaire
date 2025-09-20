/*

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐
  │   ││   │     │   ││   ││   ││   │
  └───┘└─▲─┘     └───┘└───┘└───┘└───┘
         └───────────────────────────────Waste
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐
  │   ││   ││   ││   ││   ││   ││   │
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘

*/

import { useAtomValue } from "jotai";
import { cardAreaAtom, highlightedAreaAtom } from "../../store";
import Card, { CARD_WIDTH } from "../Card";
import CardSlot from "../CardSlot";

export default function Waste() {
  const waste = useAtomValue(cardAreaAtom("waste"));
  const highlighted = useAtomValue(highlightedAreaAtom).area === "waste";
  const topCard = waste.at(-1);
  return (
    <box style={{ marginRight: CARD_WIDTH }}>
      {topCard ? <Card {...topCard} highlighted={highlighted} /> : <CardSlot highlighted={highlighted} />}
    </box>
  );
}
