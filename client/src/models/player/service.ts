import { Resource } from "../resource";
import { post } from "../../utils/request";
import { Interface } from "../../config/interface";

export const dealInBlackMarket = (
  giveResource: Resource,
  gainResource: Resource
) =>
  post(Interface.dealInBlackMarket, {
    giveResource,
    gainResource
  });
