import React from "react";
import { render, Text, Box } from "ink";
import Board from "./components/Board";
import { RecoilRoot, useRecoilValue } from "recoil";
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
  <RecoilRoot>
    <Game />
  </RecoilRoot>
);
