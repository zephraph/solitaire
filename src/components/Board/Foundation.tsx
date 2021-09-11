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

import { FC } from "react";
import { Box } from "ink";
import { CardSlot } from "../CardSlot";
import { GameState, useGameState } from "../../game";
import { Card } from "../Card";
import { getTopCard } from "../../helpers";
import React from "react";

const foundationSelector = (state: GameState) =>
  state.foundation.map(getTopCard);

const highlightedPositionSelector = (state: GameState) =>
  state.highlighted.area === "foundation" ? state.highlighted.position : -1;

const selectedPositionSelector = (state: GameState) =>
  state.selected?.area === "foundation" ? state.selected.position : -1;

const Foundation: FC = () => {
  const foundation = useGameState(foundationSelector);
  const highlightedPosition = useGameState(highlightedPositionSelector);
  const selectedPosition = useGameState(selectedPositionSelector);

  return (
    <Box>
      {foundation.map(({ card }, index) =>
        card ? (
          <Card
            key={index}
            isHighlighted={highlightedPosition === index}
            isSelected={selectedPosition === index}
            {...card}
          />
        ) : (
          <CardSlot key={index} isHighlighted={highlightedPosition === index} />
        )
      )}
    </Box>
  );
};

export default Foundation;
