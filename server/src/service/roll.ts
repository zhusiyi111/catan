import { sample } from "lodash";

export function doubleRoll() {
  return [rollBetween(1, 6), rollBetween(1, 6)];
}

export function rollBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function rollBetweenArr(items: number[]) {
  return sample(items);
}
