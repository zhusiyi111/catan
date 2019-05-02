const prefix = "/api";
const domain = "catan.net";

const Path = {
  /* flow */
  ready: `/flow/ready`,
  endRound: `/flow/endRound`,
  reconnect: `/flow/reconnect`,

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

export { Path, Interface, prefix, domain };
