import type { Card } from "./types";
import { last } from "./utils";

const MAX_INT = (2 ^ 31) - 1;

export function randomInt() {
  return Math.floor(Math.random() * MAX_INT);
}

//
/**
 * A psudo random number generator using mulberry32 as originally implemented by
 * Tommy Ettinger.
 *
 * @see https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 *
 * @param seed
 * @returns
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], seed: number) {
  const random = mulberry32(seed);
  let remaining = items.length;
  let current;
  let temp;

  while (remaining) {
    current = Math.floor(random() * remaining--);

    temp = items[remaining];
    items[remaining] = items[current];
    items[current] = temp;
  }

  return items;
}

export function getTopCard(cardStack: Card[]) {
  return {
    index: cardStack.length > 0 ? cardStack.length - 1 : 0,
    card: last(cardStack),
  };
}

export function findFristFaceUpCard(cardStack: Card[]) {
  for (let index = 0; index < cardStack.length; index++) {
    if (cardStack[index].face === "up") {
      return {
        card: cardStack[index],
        index,
      };
    }
  }
  return {
    card: undefined,
    index: 0,
  };
}
