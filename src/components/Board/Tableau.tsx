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
import { Box, useInput } from "ink";
import CardSlot from "../CardSlot";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedState, tableauState, CardState } from "../../state";
import Card from "../Card";
import { useForceUpdate } from "../../actions";

const Tableau: FC = () => {
  const [tableau, setTableau] = useRecoilState(tableauState);
  const selected = useRecoilValue(selectedState("tableau"));
  const [selectedCard, setSelectedCard] = useState<CardState>();
  const forceUpdate = useForceUpdate();

  if (
    selected.length === 1 &&
    selected[0] === false &&
    selectedCard !== undefined
  ) {
    setSelectedCard(undefined);
  }

  useInput((char) => {
    if (selectedCard && char === " ") {
      selectedCard.faceUp = !selectedCard.faceUp;
      forceUpdate();
    }
  });
  return (
    <Box>
      {tableau.map((stack, stackIndex) => {
        const stackEmpty = stack.length === 0;
        if (stackEmpty) {
          setSelectedCard(undefined);
        }
        return stackEmpty ? (
          <CardSlot
            key={"stack" + stackIndex}
            selected={selected[stackIndex] && selected[stackIndex][0]}
          />
        ) : (
          <Box flexDirection="column" key={"stack" + stackIndex}>
            {stack.map((card, cardIndex) => {
              const isSelected =
                selected[stackIndex] && selected[stackIndex][cardIndex];
              const offset =
                cardIndex > 0 ? (stack[cardIndex - 1]?.faceUp ? -5 : -6) : 0;

              if (isSelected && selectedCard !== card) {
                setSelectedCard(card);
              }
              return (
                <Card
                  marginTop={offset}
                  key={"sack" + stackIndex + "+card" + cardIndex}
                  selected={isSelected}
                  {...card}
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
