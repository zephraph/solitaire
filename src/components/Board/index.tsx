import React, { FC } from "react";
import { Box } from "ink";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Waste from "./Waste";
import Tableau from "./Tableau";

interface BoardProps {}

const Board: FC<BoardProps> = () => {
  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Stock />
        <Waste />
        <Foundation />
      </Box>
      <Tableau />
    </Box>
  );
};

export default Board;
