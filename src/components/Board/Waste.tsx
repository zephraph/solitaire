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
import { GameState, useGameState } from "../../game";
import { getTopCard } from "../../helpers";

const isHighlightedSelector = (state: GameState) =>
  state.highlighted.area === "waste";
const isSelectedSelector = (state: GameState) =>
  state.selected?.area === "waste";
const wasteTopCardSelector = (state: GameState) => getTopCard(state.waste);

export default function Waste() {
  const { card } = useGameState(wasteTopCardSelector);
  const isHighlighted = useGameState(isHighlightedSelector);
  const isSelected = useGameState(isSelectedSelector);

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
