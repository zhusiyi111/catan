import { Location } from "../types/location";

export function isEqualLocation(a: Location, b: Location) {
  return a.x === b.x && a.y === b.y;
}
