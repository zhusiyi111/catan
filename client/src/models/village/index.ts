import { Location } from "../location";
import { DotLocation } from "../dot";
import { buildVillage, upgradeVillage, robVillage } from "./service";
import { State } from "..";
import { BuildScoreMap as _BuildScoreMap } from "../../const.json";

export const BuildScoreMap: { [k: string]: number } = _BuildScoreMap;

export interface VillageLocation extends Location {}

export enum VillageType {
  None = "none",
  Town = "town", // 乡村
  City = "city", // 城市
  Warehouse = "warehouse", // 仓库
  Castle = "castle", // 城堡
  Wonder = "wonder" // 奇观
}

export interface IVillage {
  owner: number; //所有者id
  location: VillageLocation;
  type: VillageType;
  hasRobber: boolean; //是否有强盗
}

export type Villages = IVillage[];

const initialState: Villages = [];

export default {
  state: initialState,
  reducers: {
    updateVillages(s: Villages, p: Villages) {
      return p;
    },
    addVilliage(s: Villages, newVillage: Villages) {
      return s.concat(newVillage);
    }
  },
  effects: (dispatch: any) => ({
    async buildVillage(location: DotLocation, s: State) {
      await buildVillage(location);
      dispatch.status.returnMain();
    },
    async upgradeVillage(
      { location, type }: { location: VillageLocation; type: VillageType },
      s: State
    ) {
      await upgradeVillage(location, type);
      dispatch.status.returnMain();
    },
    async robVillage(location: VillageLocation) {
      await robVillage(location);
      dispatch.status.returnMain();
    },
    async robbing(location: VillageLocation) {}
  })
};
