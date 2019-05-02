import { flatten } from "lodash";



import { RollNumber } from "./models/roll";
import { ResourceType } from "./models/resource";
import { Player } from "./models/player";
import { IDot } from "./models/dot";
import { IArea } from "./models/area";
import { VillageType, IVillage } from "./models/village";

export function getDosFromRollNumber(
  rollNumber: RollNumber,
  dots: IDot[],
  areas: IArea[]
) {
  const selectedAreas = areas.filter(v => v.number === rollNumber);
  // 筛选出dot
  const selectedLocation = getDotsAroundAreas(selectedAreas);
  const selectedDots = dots.filter(v => {
    const { x, y } = v.location;
    // TODO
  });
}

export function getDotsAroundArea(area: IArea) {
  const {
    type,
    location: { x, y }
  } = area;
  return [
    { x, y, type },
    { x: x + 1, y, type },
    { x, y: y + 1, type },
    { x: x + 1, y: y + 1, type }
  ];
}

export function getDotsAroundAreas(areas: IArea[]) {
  const dots = flatten(areas.map(getDotsAroundArea));
  return dots;
  // return unique(dots);
  // 貌似不需要unique
  // function unique(dots: AreaLocation[]) {
  //   return Object.values(
  //     dots.reduce((acc, v) => {
  //       const { x, y } = v;
  //       acc[`${x},${y}`] = [x, y];
  //       return acc;
  //     }, {})
  //   );
  // }
}

export function villageAddNum(village: IVillage) {
  switch (village.type) {
    case VillageType.Town:
      return 1;
    case VillageType.City:
      return 2;
    case VillageType.None:
      return 0;
  }
}

// 通过dots分配资源
// export function getResourceFromDots(
//   dots: (IDot & { type: ResourceType })[],
//   players: Player[]
// ) {
//   const villages = dots
//     .map(v => ({ ...v.village, resource: v.type }))
//     .filter(v => v.type !== VillageType.None);
//   villages.map(village => {
//     const { resource } = village;
//     const player = players.find(player => player.id === village.owner);
//     // 这里加资源
//     if (player) {
//       player.resource[resource] += villageAddNum(village);
//     }
//   });
// }

export function getAroundRoadFromArea(area: IArea) {}
