import { render, Text } from "ink";
import Board from "./components/Board";
import { Provider } from "mutik";
import { gameState } from "./game";
import React from "react";

function Game() {
  return (
    <>
      <Text dimColor>↑ ← ↓ → to move, [space] to select</Text>
      <Board />
    </>
  );
}

render(
  <Provider store={gameState}>
    <Game />
  </Provider>
);
