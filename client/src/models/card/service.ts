import { get, post } from "../../utils/request";
import { Interface } from "../../config/interface";
import { ResourceType } from "../resource";

export const drawCard = () => get(Interface.drawCard);

export const useHarvestCard = (type: ResourceType) =>
  post(Interface.useHarvestCard, {
    type
  });
