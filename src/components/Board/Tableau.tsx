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
import CardSlot from "../CardSlot";
import { useAtomValue } from "jotai";
import {
  cardAreaAtom,
  CardState,
  highlightedAreaAtom,
  HighlightedArea,
} from "../../store";
import Card from "../Card";

const isHighlighted = (
  highlighted: HighlightedArea,
  position: number,
  index: number,
) => {
  if (highlighted.area !== "tableau") return false;
  return highlighted.position === position && highlighted.index === index;
};

export default function Tableau() {
  const tableau = useAtomValue(cardAreaAtom("tableau"));
  const highlighted = useAtomValue(highlightedAreaAtom);
  const sortedTableau = Array.from({ length: 7 }, (_, position) =>
    tableau.filter((card) => card.position === position),
  );

  return (
    <box flexDirection="row">
      {sortedTableau.map((stack, stackIndex) => {
        const stackEmpty = stack.length === 0;
        return stackEmpty ? (
          <CardSlot highlighted={isHighlighted(highlighted, stackIndex, 0)} />
        ) : (
          <box flexDirection="column" key={"stack" + stackIndex}>
            {stack.map((card, cardIndex) => {
              const { position, area, ...cardProps } = card;
              const offset =
                cardIndex > 0 ? (stack[cardIndex - 1]?.faceUp ? -5 : -6) : 0;

              return (
                <box style={{ marginTop: offset }}>
                  <Card
                    {...cardProps}
                    highlighted={isHighlighted(
                      highlighted,
                      stackIndex,
                      cardIndex,
                    )}
                  />
                </box>
              );
            })}
          </box>
        );
      })}
    </box>
  );
}
