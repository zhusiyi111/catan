import { RollNumber } from ".";

export function roll(): RollNumber {
  return Math.ceil(Math.random() * 6);
}

export function doubleRoll(): RollNumber[] {
  return [roll(), roll()];
}
