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

import { FC } from "react";
import { Box } from "ink";
import { CardSlot } from "../CardSlot";
import { Card } from "../Card";
import { GameState } from "../../game";
import { CardHighlight, CardSelection } from "../../types";
import { useSelector } from "mutik";

const tableauSelector = (state: GameState) => state.tableau;
const highlightedSelector = (state: GameState) =>
  state.highlighted.area === "tableau" ? state.highlighted : undefined;

const selectedSelector = (state: GameState) =>
  state.selected?.area === "tableau" ? state.selected : undefined;

const isHighlighted = (
  highlighted: CardHighlight | undefined,
  position: number,
  index: number = 0
) =>
  highlighted
    ? highlighted.position === position && highlighted.index === index
    : false;

const isSelected = (
  selected: CardSelection | undefined,
  position: number,
  index: number
) =>
  selected ? selected.position === position && selected.index === index : false;

const Tableau: FC = () => {
  const tableau = useSelector(tableauSelector);
  const highlighted = useSelector(highlightedSelector);
  const selected = useSelector(selectedSelector);

  return (
    <Box>
      {tableau.map((stack, position) =>
        stack.length === 0 ? (
          <CardSlot
            key={`tableau-${position}`}
            isHighlighted={isHighlighted(highlighted, position)}
          />
        ) : (
          <Box flexDirection="column" key={"tableau-stack" + position}>
            {stack.map((card, cardIndex) => {
              const offset =
                cardIndex > 0
                  ? stack[cardIndex - 1]?.face === "up"
                    ? -5
                    : -6
                  : 0;

              return (
                <Card
                  marginTop={offset}
                  key={"tableau-stack-" + position + "-card-" + cardIndex}
                  {...card}
                  isHighlighted={isHighlighted(
                    highlighted,
                    position,
                    cardIndex
                  )}
                  isSelected={isSelected(selected, position, cardIndex)}
                />
              );
            })}
          </Box>
        )
      )}
    </Box>
  );
};

export default Tableau;
