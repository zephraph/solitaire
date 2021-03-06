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

import React, { FC, useState } from "react";
import { Box } from "ink";
import CardSlot from "../CardSlot";
import { useRecoilValue } from "recoil";
import {
  cardAreaState,
  CardState,
  highlightedAreaState,
  HighlightedArea,
} from "../../state";
import Card from "../Card";
import groupBy from "lodash/groupBy";

const isHighlighted = (
  highlighted: HighlightedArea,
  position: number,
  index: number
) => {
  if (highlighted.area !== "tableau") return false;
  return highlighted.position === position && highlighted.index === index;
};

const Tableau: FC = () => {
  const tableau = useRecoilValue(cardAreaState("tableau"));
  const highlighted = useRecoilValue(highlightedAreaState);
  const sortedTableau = Array.from({ length: 7 }, (_, position) =>
    tableau.filter((card) => card.position === position)
  );

  return (
    <Box>
      {sortedTableau.map((stack, stackIndex) => {
        const stackEmpty = stack.length === 0;
        return stackEmpty ? (
          <CardSlot
            key={"stack" + stackIndex}
            highlighted={isHighlighted(highlighted, stackIndex, 0)}
          />
        ) : (
          <Box flexDirection="column" key={"stack" + stackIndex}>
            {stack.map((card, cardIndex) => {
              const { position, area, ...cardProps } = card;
              const offset =
                cardIndex > 0 ? (stack[cardIndex - 1]?.faceUp ? -5 : -6) : 0;

              return (
                <Card
                  marginTop={offset}
                  key={"sack" + stackIndex + "+card" + cardIndex}
                  {...cardProps}
                  highlighted={isHighlighted(
                    highlighted,
                    stackIndex,
                    cardIndex
                  )}
                />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default Tableau;
