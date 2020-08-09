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
import { selectedState, stockState, wasteState } from "../../state";
import Card from "../Card";
import { useInput } from "ink";

const Stock: FC = () => {
  const [stock, setStock] = useRecoilState(stockState);
  const [waste, setWaste] = useRecoilState(wasteState);
  const [selected] = useRecoilValue(selectedState("stock"));

  useInput((char) => {
    if (selected && char === " ") {
      if (stock.length > 0) {
        const [cardBeingMoved, ...newStock] = stock;
        setWaste([cardBeingMoved, ...waste]);
        setStock(newStock);
      } else {
        setStock([...waste].reverse());
        setWaste([]);
      }
    }
  });

  return stock.length > 0 ? (
    <Card {...stock[0]} faceUp={false} selected={selected} />
  ) : (
    <CardSlot selected={selected} />
  );
};

export default Stock;
