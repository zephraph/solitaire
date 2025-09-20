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

import { last } from "es-toolkit";
import { useAtomValue } from "jotai";
import { cardAreaAtom, highlightedAreaAtom } from "../../store";
import Card from "../Card";
import CardSlot from "../CardSlot";

function Foundation() {
  const foundation = useAtomValue(cardAreaAtom("foundation"));
  const highlighted = useAtomValue(highlightedAreaAtom);
  const sortedFoundation = Array.from({ length: 4 }, (_, position) =>
    foundation.filter((card) => card.position === position)
  );
  const isHighlighted = (position: number) => highlighted.area === "foundation" && highlighted.position === position;
  return (
    <box flexDirection="row">
      {sortedFoundation.map((stack, index) =>
        stack.length === 0 ? (
          <CardSlot highlighted={isHighlighted(index)} />
        ) : (
          <Card {...last(stack)!} highlighted={isHighlighted(index)} />
        )
      )}
    </box>
  );
}

export default Foundation;
