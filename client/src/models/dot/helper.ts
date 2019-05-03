import { Dots, IDot } from ".";
import { IArea } from "../area";
import { getAreasSize } from "../area/helper";
import { Villages, VillageLocation } from "../village";
import { isEqualLocation } from "../location/helper";

export function getDotsFromAreas(areas: IArea[]): Dots {
  const { x: width, y: height } = getAreasSize(areas);
  let result = [];
  for (let x = 0; x <= width + 1; x++) {
    for (let y = 0; y <= height + 1; y++) {
      const dot = {
        location: {
          x,
          y
        }
      };
      result.push(dot);
    }
  }
  return result;
}

export function isEffectedDot(dot: IDot, villages: Villages) {
  const effectedLocations = villages.reduce((acc, v) => {
    const dotstrs = getEffectLocation(v.location).map(v => JSON.stringify(v));
    dotstrs.map(v => {
      acc.add(v);
      return null;
    });
    return acc;
  }, new Set());
  return Array.from(effectedLocations, v => JSON.parse(v)).some(v =>
    isEqualLocation(v, dot.location)
  );
}

function getEffectLocation(location: VillageLocation) {
  const { x, y } = location;
  let result: VillageLocation[] = [
    { x, y },
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 }
  ];

  return result.filter(({ x, y }) => x >= 0 && y >= 0);
}
