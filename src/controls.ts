import keys from "mousetrap";
import {
  shiftHighlightLeft,
  shiftHighlightRight,
  shiftHighlightUp,
  shiftHightlightDown,
} from "./actions";

keys.bind("left", shiftHighlightLeft);
keys.bind("right", shiftHighlightRight);
keys.bind("up", shiftHighlightUp);
keys.bind("down", shiftHightlightDown);
