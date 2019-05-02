import { ResourceType } from "./resource";
import { Location } from "./location";

export enum AreaName {
  Brick = "砖",
  Wood = "木",
  Sheep = "羊",
  Wheat = "麦",
  Ore = "矿",
  Desert = "沙漠"
}

export enum AreaExtendType {
  Desert = "desert"
}

export const AreaTypeToName = {
  [ResourceType.Brick]: AreaName.Brick,
  [ResourceType.Wood]: AreaName.Wood,
  [ResourceType.Sheep]: AreaName.Sheep,
  [ResourceType.Wheat]: AreaName.Wheat,
  [ResourceType.Ore]: AreaName.Ore,
  [AreaExtendType.Desert]: AreaName.Desert
};

// 区域类型
export type AreaType = ResourceType | AreaExtendType;

export interface AreaLocation extends Location {}

export interface IArea {
  type: AreaType; // 地区类型
  number: number; //
  name: AreaName;
  location: Location; //位置
  hasRobber: boolean; //是否有强盗
}

export type Areas = IArea[];
