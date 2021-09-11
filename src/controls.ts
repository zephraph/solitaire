import { useInput } from "ink";
import {
  selectCard,
  shiftHighlightLeft,
  shiftHighlightRight,
  shiftHighlightUp,
  shiftHightlightDown,
  startNewGame,
} from "./actions";

export const useKeybindings = () => {
  useInput((input, key) => {
    if (key.leftArrow) return shiftHighlightLeft();
    if (key.rightArrow) return shiftHighlightRight();
    if (key.downArrow) return shiftHightlightDown();
    if (key.upArrow) return shiftHighlightUp();
    if (input === " ") return selectCard();
    if (input === "n") return startNewGame();
  });
};
