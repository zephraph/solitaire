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
import { gameState } from "../../game";
import Card from "../Card";
import { useSnapshot } from "valtio";

const Foundation: FC = () => {
  const foundation = useSnapshot(gameState.foundation);
  return (
    <Box>
      {sortedFoundation.map((stack, index) =>
        stack.length === 0 ? (
          <CardSlot
            key={"foundation" + index}
            highlighted={isHighlighted(index)}
          />
        ) : (
          <Card
            key={"foundation" + index}
            {...last(stack)}
            highlighted={isHighlighted(index)}
          />
        )
      )}
    </Box>
  );
};

export default Foundation;
