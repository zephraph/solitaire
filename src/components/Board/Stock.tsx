/*                                               

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐            
  │   ││   │     │   ││   ││   ││   │            
  └─▲─┘└───┘     └───┘└───┘└───┘└───┘            
    └────────────────────────────────────Stock   
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐            
  │   ││   ││   ││   ││   ││   ││   │            
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘            

*/

import React, { FC } from "react";
import CardSlot from "../CardSlot";
import { useRecoilValue } from "recoil";
import { CardFaceDown } from "../Card";
import { cardAreaState, highlightedAreaState } from "../../state";

const Stock: FC = () => {
  const stock = useRecoilValue(cardAreaState("stock"));
  const highlighted = useRecoilValue(highlightedAreaState).area === "stock";

  return stock.length > 0 ? (
    <CardFaceDown highlighted={highlighted} />
  ) : (
    <CardSlot highlighted={highlighted} />
  );
};

export default Stock;
