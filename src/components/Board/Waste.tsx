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
import { CardSlot } from "../CardSlot";
import { Card, CARD_WIDTH } from "../Card";
import { Box } from "ink";
import { gameState, GameState } from "../../game";
import { getTopCard } from "../../helpers";
import { useSelector } from "mutik";

const isHighlightedSelector = (state: GameState) =>
  state.highlighted.area === "waste";
const isSelectedSelector = (state: GameState) =>
  state.selected?.area === "waste";
const wasteTopCardSelector = (state: GameState) => getTopCard(state.waste);

export default function Waste() {
  const { card } = useSelector(wasteTopCardSelector);
  const isHighlighted = useSelector(isHighlightedSelector);
  const isSelected = useSelector(isSelectedSelector);

  return (
    <Box marginRight={CARD_WIDTH}>
      {card ? (
        <Card {...card} isHighlighted={isHighlighted} isSelected={isSelected} />
      ) : (
        <CardSlot isHighlighted={isHighlighted} />
      )}
    </Box>
  );
}
