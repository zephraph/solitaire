import React from "react";
import { render, Text, Box } from "ink";
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
      <Text dimColor>↑ ← ↓ → to move, [space] to select</Text>
      <Board />
    </>
  );
}

render(
  <Provider>
    <Game />
  </Provider>
);
