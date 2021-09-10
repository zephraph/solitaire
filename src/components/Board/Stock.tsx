/*                                               

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐            
  │   ││   │     │   ││   ││   ││   │            
  └─▲─┘└───┘     └───┘└───┘└───┘└───┘            
    └────────────────────────────────────Stock   
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐            
  │   ││   ││   ││   ││   ││   ││   │            
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘            

*/

import { FC } from "react";
import { CardSlot } from "../CardSlot";
import { CardFaceDown } from "../Card";
import { GameState, useGameState } from "../../game";
import { getTopCard } from "../../helpers";
import React from "react";

const isHighlightedSelector = (state: GameState) =>
  state.highlighted.area === "stock";
const stockCardSelector = (state: GameState) => getTopCard(state.stock);

const Stock: FC = () => {
  const { card } = useGameState(stockCardSelector);
  const isHighlighted = useGameState(isHighlightedSelector);

  return card ? (
    <CardFaceDown highlighted={isHighlighted} />
  ) : (
    <CardSlot isHighlighted={isHighlighted} />
  );
};

export default Stock;
