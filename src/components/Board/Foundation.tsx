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

import CardSlot from "../CardSlot";
import { useAtomValue } from "jotai";
import { highlightedAreaAtom, cardAreaAtom } from "../../store";
import Card from "../Card";
import { last } from "es-toolkit";

function Foundation() {
  const foundation = useAtomValue(cardAreaAtom("foundation"));
  const highlighted = useAtomValue(highlightedAreaAtom);
  const sortedFoundation = Array.from({ length: 4 }, (_, position) =>
    foundation.filter((card) => card.position === position),
  );
  const isHighlighted = (position: number) =>
    highlighted.area === "foundation" && highlighted.position === position;
  return (
    <box flexDirection="row">
      {sortedFoundation.map((stack, index) =>
        stack.length === 0 ? (
          <CardSlot highlighted={isHighlighted(index)} />
        ) : (
          <Card {...last(stack)!} highlighted={isHighlighted(index)} />
        ),
      )}
    </box>
  );
}

export default Foundation;
