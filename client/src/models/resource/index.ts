import { VillageType } from "../village";

export enum ResourceType {
  Wood = "wood", //木头
  Brick = "brick", //砖头
  Sheep = "sheep", //绵羊
  Wheat = "wheat", //麦子
  Ore = "ore" //铁矿
}

export const ResourceName: { [i: string]: string } = {
  [ResourceType.Wood]: "木",
  [ResourceType.Brick]: "砖",
  [ResourceType.Sheep]: "羊",
  [ResourceType.Wheat]: "麦",
  [ResourceType.Ore]: "矿"
};

export interface Resource {
  [ResourceType.Brick]: number;
  [ResourceType.Wood]: number;
  [ResourceType.Sheep]: number;
  [ResourceType.Wheat]: number;
  [ResourceType.Ore]: number;
  [k: string]: number;
}

export const BuildingResouceMap: { [i: string]: Resource } = {
  [VillageType.City]: {
    [ResourceType.Wood]: 0,
    [ResourceType.Brick]: 0,
    [ResourceType.Sheep]: 0,
    [ResourceType.Wheat]: 2,
    [ResourceType.Ore]: 3
  },
  [VillageType.Warehouse]: {
    [ResourceType.Wood]: 1,
    [ResourceType.Brick]: 2,
    [ResourceType.Sheep]: 0,
    [ResourceType.Wheat]: 0,
    [ResourceType.Ore]: 2
  },
  [VillageType.Castle]: {
    [ResourceType.Wood]: 1,
    [ResourceType.Brick]: 2,
    [ResourceType.Sheep]: 0,
    [ResourceType.Wheat]: 0,
    [ResourceType.Ore]: 2,
  },
  [VillageType.Wonder]: {
    [ResourceType.Wood]: 2,
    [ResourceType.Brick]: 2,
    [ResourceType.Sheep]: 2,
    [ResourceType.Wheat]: 1,
    [ResourceType.Ore]: 1
  }
};
