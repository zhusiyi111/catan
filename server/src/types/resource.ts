import {
  BuildingResouceMap as needMap,
  CardResource as _CardResource
} from "../../../client/src/const.json";

export const CardResource = _CardResource as { [i: string]: number };

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

export type IBuildingResouceMap = { [i: string]: Resource };

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
