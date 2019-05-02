import { Location } from "./location";

export interface VillageLocation extends Location {}

export enum VillageType {
  None = "none",
  Town = "town", // 乡村
  City = "city", // 城市
  Warehouse = "warehouse", // 仓库
  Castle = "castle", // 城堡
  Wonder = "wonder" //奇迹
}

export interface IVillage {
  owner: number; //所有者id
  location: VillageLocation;
  type: VillageType;
}

export type Villages = IVillage[];
