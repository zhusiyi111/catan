import {
  BuildingResouceMap as _BuildingResouceMap,
  ProduceMap as _ProduceMap,
  CardResource as _CardResource
} from "../../const.json";

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

export const BuildingResouceMap: {
  [i: string]: Resource;
} = _BuildingResouceMap;

export const ProduceMap: {
  [i: string]: number;
} = _ProduceMap;

export const CardResource: any = _CardResource;
