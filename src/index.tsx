import { render, Text } from "ink";
import { useKeybindings } from "./controls";
import Board from "./components/Board";
import React from "react";

function Game() {
  useKeybindings();
  return (
    <>
      <Text dimColor>↑ ← ↓ → to move, [space] to select</Text>
      <Board />
    </>
  );
}

const { waitUntilExit } = render(<Game />);

(async () => {
  console.log("await?");
  await waitUntilExit();
})();
