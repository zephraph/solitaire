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
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedState, wasteState } from "../../state";
import Card, { CARD_WIDTH } from "../Card";
import { Box } from "ink";

export default function Waste() {
  const waste = useRecoilValue(wasteState);
  const [selected] = useRecoilValue(selectedState("waste"));
  return (
    <Box marginRight={CARD_WIDTH}>
      {waste.length ? (
        <Card {...waste[0]} faceUp={true} selected={selected} />
      ) : (
        <CardSlot selected={selected} />
      )}
    </Box>
  );
}
