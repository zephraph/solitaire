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
import { useRecoilValue } from "recoil";
import { cardAreaState, highlightedAreaState } from "../../state";
import Card, { CARD_WIDTH } from "../Card";
import { Box } from "ink";
import last from "lodash/last";

export default function Waste() {
  const waste = useRecoilValue(cardAreaState("waste"));
  const highlighted = useRecoilValue(highlightedAreaState).area === "waste";
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
