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
import { useRecoilValue } from "recoil";
import { selectedState } from "../../state";

const Foundation: FC = () => {
  const selected = useRecoilValue(selectedState("foundation"));
  return (
    <Box>
      <CardSlot selected={selected[0]} />
      <CardSlot selected={selected[1]} />
      <CardSlot selected={selected[2]} />
      <CardSlot selected={selected[3]} />
    </Box>
  );
};

export default Foundation;
