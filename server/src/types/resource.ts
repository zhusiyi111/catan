import { VillageType } from "../types/village";
import { cloneDeep } from "lodash";
import { BuildingResouceMap as needMap } from "../../../client/src/models/resource";

export enum ResourceType {
  Brick = "brick", //砖头
  Wood = "wood", //木头
  Sheep = "sheep", //绵羊
  Wheat = "wheat", //麦子
  Ore = "ore" //铁矿
}

export interface Resource {
  [ResourceType.Brick]: number;
  [ResourceType.Wood]: number;
  [ResourceType.Sheep]: number;
  [ResourceType.Wheat]: number;
  [ResourceType.Ore]: number;
  [k: string]: number;
}

export const BuildingResouceMap = needMap;

const EmptyResource = {
  [ResourceType.Brick]: 0,
  [ResourceType.Wood]: 0,
  [ResourceType.Sheep]: 0,
  [ResourceType.Wheat]: 0,
  [ResourceType.Ore]: 0
};

export const getEmptyResource = () => ({
  [ResourceType.Brick]: 0,
  [ResourceType.Wood]: 0,
  [ResourceType.Sheep]: 0,
  [ResourceType.Wheat]: 0,
  [ResourceType.Ore]: 0
});
