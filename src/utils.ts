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
}

export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function last<T>(arr: T[]) {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
}

export function shallowCompare<T extends Record<string, any>>(
  obj1: T,
  obj2: T
) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (let [key, value] of Object.entries(obj1)) {
    if (obj2[key] !== value) {
      return false;
    }
  }

  return true;
}
