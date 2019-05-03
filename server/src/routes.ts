import * as Router from "koa-router";
import controller = require("./controller");
import { Interface, prefix } from "../../client/src/config/interface";

const router = new Router();

/* flow */
router.post(prefix + Interface.ready, controller.flow.ready);
router.post(prefix + Interface.endRound, controller.flow.endRound);
router.post(prefix + Interface.reconnect, controller.flow.reconnect);

/* players */
router.post(prefix + Interface.dealInBlackMarket, controller.player.dealInBlackMarket);

// Village
router.post(prefix + Interface.buildVillage, controller.village.buildVillage);
router.post(
  prefix + Interface.upgradeVillage,
  controller.village.upgradeVillage
);
router.post(prefix + Interface.robVillage, controller.village.robVillage);

/* area */
router.post(
  prefix + Interface.selectRobberArea,
  controller.area.selectRobberAreaCauseArmy
);

/* card */
router.post(prefix + Interface.drawCard, controller.player.drawCard);
router.post(
  prefix + Interface.useHarvestCard,
  controller.player.useHarvestCard
);

export { router };
