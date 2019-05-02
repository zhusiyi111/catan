import { AreaLocation } from ".";
import { post } from "../../utils/request";
import { Interface } from "../../config/interface";
import { VillageLocation } from "../village";

export const selectRobberArea = ({
  x,
  y,
  isRobDice //是否来自强盗骰子
}: AreaLocation & { isRobDice?: boolean }) =>
  post<{ robVillages: VillageLocation[] }>(Interface.selectRobberArea, {
    x,
    y,
    isRobDice
  });
