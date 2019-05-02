import { IArea, Areas } from "../types/area";
import {
  Villages,
  IVillage,
  VillageLocation,
  VillageType
} from "../types/village";
import { isEqualLocation } from "./location";
import { Player } from "player";

export function getVillagesAroundAreas(areas: Areas, villages: Villages) {
  const result = areas.reduce(
    (acc: { village: IVillage; area: IArea }[], area) => {
      return acc.concat(getVillagesAroundArea(area, villages));
    },
    []
  );
  return result;
}

export function getVillagesAroundArea(area: IArea, villages: Villages) {
  const { location } = area;
  const { x: areaX, y: areaY } = location;
  const locationList = [
    { x: areaX, y: areaY, area },
    { x: areaX + 1, y: areaY, area },
    { x: areaX, y: areaY + 1, area },
    { x: areaX + 1, y: areaY + 1, area }
  ];
  const result = villages.reduce(
    (acc: { village: IVillage; area: IArea }[], village) => {
      locationList.map(location => {
        if (isEqualLocation(location, village.location)) {
          acc.push({
            village,
            area
          });
        }
        return null;
      });
      return acc;
    },
    []
  );
  return result;
}

export function getVillageFromLocation(
  location: VillageLocation,
  villages: Villages
) {
  return villages.find(v => isEqualLocation(v.location, location)) as IVillage;
}

/* 计算玩家拥有的城堡数 */
export function calcCastleNum(player: Player, villages: Villages) {
  return villages.filter(
    v => v.owner === player.id && v.type === VillageType.Castle
  ).length;
}
