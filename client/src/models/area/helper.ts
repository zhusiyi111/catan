import { Areas, IArea } from ".";
import { Villages, IVillage, VillageType } from "../village";
import { isEqualLocation } from "../location/helper";

export function getAreasSize(areas: Areas) {
  return areas.reduce(
    (acc, v) => {
      const {
        location: { x, y }
      } = v;
      if (acc.x < x) {
        acc.x = x;
      }
      if (acc.y < y) {
        acc.y = y;
      }
      return acc;
    },
    {
      x: 0,
      y: 0
    }
  );
}

/* 判断area周围是否有城堡 */
export function isNeerCastle(area: IArea, villages: Villages) {
  const aroundVillages = getVillagesAroundArea(area, villages);
  return aroundVillages.some(v => v.type === VillageType.Castle);
}

/* 获得area周围的village */
export function getVillagesAroundArea(area: IArea, villages: Villages) {
  const { location } = area;
  const { x: areaX, y: areaY } = location;
  const locationList = [
    { x: areaX, y: areaY, area },
    { x: areaX + 1, y: areaY, area },
    { x: areaX, y: areaY + 1, area },
    { x: areaX + 1, y: areaY + 1, area }
  ];
  const result = villages.reduce((acc: Villages, village) => {
    locationList.some(location => {
      if (isEqualLocation(location, village.location)) {
        acc.push(village);
        return true;
      }
      return false;
    });
    return acc;
  }, []);
  return result;
}
