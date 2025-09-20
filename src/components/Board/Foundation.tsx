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
import { highlightedAreaState, cardAreaState } from "../../state";
import Card from "../Card";
import { last } from "es-toolkit";

const Foundation: FC = () => {
  const foundation = useRecoilValue(cardAreaState("foundation"));
  const highlighted = useRecoilValue(highlightedAreaState);
  const sortedFoundation = Array.from({ length: 4 }, (_, position) =>
    foundation.filter((card) => card.position === position)
  );
  const isHighlighted = (position: number) =>
    highlighted.area === "foundation" && highlighted.position === position;
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
