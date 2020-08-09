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
import { selectedState } from "../../state";

const Stock: FC = () => {
  const [selected] = useRecoilValue(selectedState("stock"));

  return <CardSlot selected={selected} />;
};

export default Stock;
