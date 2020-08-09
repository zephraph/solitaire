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
      {tableau.map((stack, stackIndex) =>
        stack.length === 0 ? (
          <CardSlot
            key={"stack" + stackIndex}
            selected={selected[stackIndex] && selected[stackIndex][0]}
          />
        ) : (
          <Box flexDirection="column" key={"stack" + stackIndex}>
            {stack.map((card, cardIndex) => (
              <Card
                marginTop={cardIndex > 0 ? -6 : 0}
                key={"sack" + stackIndex + "+card" + cardIndex}
                selected={
                  selected[stackIndex] && selected[stackIndex][cardIndex]
                }
                {...card}
              />
            ))}
          </Box>
        )
      )}
    </Box>
  );
};

export default Tableau;
