/*                                                  
                ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─               
  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐│              
  │   ││   │    ││   ││   ││   ││   │ ◀───Foundation
  └───┘└───┘     └───┘└───┘└───┘└───┘│              
                └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─               
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐               
  │   ││   ││   ││   ││   ││   ││   │               
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘               

*/

import React, { FC } from "react";
import { Box } from "ink";
import CardSlot from "../CardSlot";

const Foundation: FC = () => {
	return (
		<Box>
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
		</Box>
	);
};

export default Foundation;
