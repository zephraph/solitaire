import React from "react";
import { render, Text, useInput, Box } from "ink";
import Board from "./components/Board";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { selectionState, tableauState } from "./state";

function Game() {
  const [cardSelected, setCardSelected] = useRecoilState(selectionState);

  useInput((input, key) => {
    if (key.upArrow) {
      setCardSelected({ x: cardSelected.x, y: cardSelected.y - 1 });
    }
    if (key.downArrow) {
      setCardSelected({ x: cardSelected.x, y: cardSelected.y + 1 });
    }
    if (key.leftArrow) {
      setCardSelected({ x: cardSelected.x - 1, y: cardSelected.y });
    }
    if (key.rightArrow) {
      setCardSelected({ x: cardSelected.x + 1, y: cardSelected.y });
    }
  });

  return (
    <>
      <Board />
      <Box>
        <Text>Selected:</Text>
        <Text color="yellow">{cardSelected.x}</Text>
        <Text>, </Text>
        <Text color="yellow">{cardSelected.y}</Text>
      </Box>
    </>
  );
}

render(
  <RecoilRoot>
    <Game />
  </RecoilRoot>
);
