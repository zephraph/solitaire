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
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedState, stockState } from "../../state";
import Card from "../Card";

const Stock: FC = () => {
  const [stock] = useRecoilState(stockState);
  const [selected] = useRecoilValue(selectedState("stock"));

  return stock.length > 0 ? (
    <Card {...stock[0]} faceUp={false} selected={selected} />
  ) : (
    <CardSlot selected={selected} />
  );
};

export default Stock;
