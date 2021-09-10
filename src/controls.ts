import { useInput } from "ink";
import {
  shiftHighlightLeft,
  shiftHighlightRight,
  shiftHighlightUp,
  shiftHightlightDown,
} from "./actions";

export const useKeybindings = () => {
  useInput((input, key) => {
    if (key.leftArrow) return shiftHighlightLeft();
    if (key.rightArrow) return shiftHighlightRight();
    if (key.downArrow) return shiftHightlightDown();
    if (key.upArrow) return shiftHighlightUp();
  });
};
