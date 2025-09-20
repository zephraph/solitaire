/*                                               

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐            
  │   ││   │     │   ││   ││   ││   │            
  └───┘└─▲─┘     └───┘└───┘└───┘└───┘            
         └───────────────────────────────Waste   
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐            
  │   ││   ││   ││   ││   ││   ││   │            
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘            

*/

import React from "react";
import CardSlot from "../CardSlot";
import { useAtomValue } from "jotai";
import { cardAreaAtom, highlightedAreaAtom } from "../../store";
import Card, { CARD_WIDTH } from "../Card";
import { Box } from "ink";
import { last } from "es-toolkit";

export default function Waste() {
  const waste = useAtomValue(cardAreaAtom("waste"));
  const highlighted = useAtomValue(highlightedAreaAtom).area === "waste";
  const topCard = last(waste);
  return (
    <Box marginRight={CARD_WIDTH}>
      {waste.length ? (
        <Card {...topCard} highlighted={highlighted} />
      ) : (
        <CardSlot highlighted={highlighted} />
      )}
    </Box>
  );
}
