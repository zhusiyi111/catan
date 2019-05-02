export function randomPercent() {
  return Math.ceil(Math.random() * 100);
}

export function underPercent(x: number) {
  return randomPercent() < x;
}

export function isBetween(target: number, min: number, max: number) {
  return target >= min && target <= max;
}
