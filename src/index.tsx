import React from "react";
import { render } from "@opentui/react";
import { Provider } from "jotai";
import Board from "./components/Board";
import {
  useHighlightCardControls,
  useSelectCardControls,
  useStockControls,
} from "./controls";

function Game() {
  useHighlightCardControls();
  useStockControls();
  useSelectCardControls();

  return (
    <>
      <text fg="dim">↑ ← ↓ → to move, [space] to select</text>
      <Board />
    </>
  );
}

render(
  <Provider>
    <Game />
  </Provider>
);
