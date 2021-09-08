import keys from "mousetrap";
import { moveLeft, moveRight, moveUp, moveDown } from "./actions";
import { gameState } from "./game";
import { getTopCard } from "./helpers";

keys.bind("left", moveLeft);
keys.bind("right", moveRight);
keys.bind("up", moveUp);
keys.bind("down", moveDown);
