/*                                               

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐            
  │   ││   │     │   ││   ││   ││   │            
  └───┘└─▲─┘     └───┘└───┘└───┘└───┘            
         └───────────────────────────────Waste   
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐            
  │   ││   ││   ││   ││   ││   ││   │            
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘            

*/

import React, { PropsWithChildren } from "react";
import { Box, BoxProps } from "ink";
import CardSlot from "../CardSlot";

export default function Waste(props: BoxProps) {
	return (
		<Box flexDirection="column" {...props}>
			<CardSlot />
		</Box>
	);
}
