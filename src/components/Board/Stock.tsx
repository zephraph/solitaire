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
import { Box } from "ink";
import CardSlot from "../CardSlot";
import { useRecoilState } from "recoil";
import { stockState, wasteState } from "../../state";

const Stock: FC = () => {
	const [stock, setStock] = useRecoilState(stockState);
	const [waste, setWaste] = useRecoilState(wasteState);

	return <CardSlot />;
};

export default Stock;
