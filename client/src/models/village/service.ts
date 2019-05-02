import { post } from "../../utils/request";
import { DotLocation } from "../dot";
import { Interface } from "../../config/interface";
import { getPlayerId } from "../player/helper";
import { VillageLocation, VillageType } from ".";

export const buildVillage = ({ x, y }: DotLocation) =>
  post(Interface.buildVillage, {
    x,
    y,
    playerId: getPlayerId()
  });

export const upgradeVillage = ({ x, y }: VillageLocation, type: VillageType) =>
  post(Interface.upgradeVillage, {
    x,
    y,
    type,
    playerId: getPlayerId()
  });

export const robVillage = ({ x, y }: VillageLocation) =>
  post(Interface.robVillage, {
    x,
    y
  });
