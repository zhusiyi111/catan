import { AreaLocation, Areas } from "../types/area";
import { isEqualLocation } from "./location";

export function getAreaFromLocation(location: AreaLocation, areas: Areas) {
  return areas.find(v => isEqualLocation(location, v.location));
}

export function removeRobberInAllAreas(areas: Areas) {
  areas.map(v => {
    v.hasRobber = false;
  });
}

export function isForbidArea(x: number, y: number) {
  return x % 2 !== 0 && y % 2 !== 0;
}
