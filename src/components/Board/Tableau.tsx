/*                                                  

  ┌───┐┌───┐     ┌───┐┌───┐┌───┐┌───┐              
  │   ││   │     │   ││   ││   ││   │              
  └───┘└───┘     └───┘└───┘└───┘└───┘              
 ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐             
  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐              
 ││   ││   ││   ││   ││   ││   ││   ││◀───Tableau  
  └───┘└───┘└───┘└───┘└───┘└───┘└───┘              
 └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘             
*/

import React, { FC } from "react";
import { Box } from "ink";
import CardSlot from "../CardSlot";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedState, tableauState } from "../../state";
import Card from "../Card";

const Tableau: FC = () => {
  const [tableau, setTableau] = useRecoilState(tableauState);
  const selected = useRecoilValue(selectedState("tableau"));
  return (
    <Box>
      {tableau.map((stack, index) =>
        stack.length === 0 ? (
          <CardSlot selected={selected[index] && selected[index][0]} />
        ) : (
          <Card {...stack[0]} />
        )
      )}
    </Box>
  );
};

export default Tableau;
