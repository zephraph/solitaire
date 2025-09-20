import { render } from "@opentui/react";
import { Provider } from "jotai";
import Board from "./components/Board";
import { useHighlightCardControls, useSelectCardControls, useStockControls } from "./controls";

function Game() {
  useHighlightCardControls();
  useStockControls();
  useSelectCardControls();

  return (
    <box flexDirection="column" justifyContent="space-between" height="100%">
      <Board />
      <text>↑ ← ↓ → to move, [space] to select</text>
    </box>
  );
}

render(
  <Provider>
    <Game />
  </Provider>
);
