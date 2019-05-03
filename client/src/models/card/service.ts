import { post } from "../../utils/request";
import { Interface } from "../../config/interface";
import { ResourceType } from "../resource";

export const drawCard = () => post(Interface.drawCard);

export const useHarvestCard = (type: ResourceType) =>
  post(Interface.useHarvestCard, {
    type
  });
