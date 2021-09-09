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
import { GameState } from "../../game";
import { getTopCard } from "../../helpers";
import { useSelector } from "mutik";

const isHighlightedSelector = (state: GameState) =>
  state.highlighted.area === "stock";
const stockCardSelector = (state: GameState) => getTopCard(state.stock);

const Stock: FC = () => {
  const { card } = useSelector(stockCardSelector);
  const isHighlighted = useSelector(isHighlightedSelector);

  return card ? (
    <CardFaceDown highlighted={isHighlighted} />
  ) : (
    <CardSlot isHighlighted={isHighlighted} />
  );
};

export default Stock;
