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
import { Box, BoxProps } from "ink";
import CardSlot from "../CardSlot";
import { useRecoilValue } from "recoil";
import { selectedState } from "../../state";

export default function Waste(props: BoxProps) {
  const [selected] = useRecoilValue(selectedState("waste"));
  return (
    <Box flexDirection="column" {...props}>
      <CardSlot selected={selected} />
    </Box>
  );
}
