import { isProd } from "./env";

const prefix = "/api";
const domain = isProd ? "catan.h5editor.cn" : "catan.h5editor.net";
const protocol = "http://";

const wsPrefix = "/ws";

const Path = {
  /* flow */
  ready: `/flow/ready`,
  endRound: `/flow/endRound`,
  reconnect: `/flow/reconnect`,

  /* player */
  dealInBlackMarket: `/player/dealInBlackMarket`,

  /* village */
  buildVillage: `/village/build`,
  upgradeVillage: `/village/upgrade`,
  upgradeCity: `/village/upgrade/city`,
  robVillage: `/village/rob`,

  /* area */
  selectRobberArea: `/area/selectRobber`,

  /* card */
  drawCard: `/player/drawCard`,
  useHarvestCard: `/player/useHarvestCard`
};

const Interface = Path;

export { Path, Interface, prefix, domain, wsPrefix, protocol };
