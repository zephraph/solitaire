import React, { FC } from "react";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Waste from "./Waste";
import Tableau from "./Tableau";

interface BoardProps {}

const Board: FC<BoardProps> = () => {
  return (
    <box style={{ flexDirection: "column" }}>
      <box style={{ marginBottom: 1 }}>
        <Stock />
        <Waste />
        <Foundation />
      </box>
      <Tableau />
    </box>
  );
};

export default Board;
