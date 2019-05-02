import * as Router from "koa-router";
import controller = require("./controller");
import { Interface, prefix } from "../../client/src/config/interface";

const router = new Router();

// USER ROUTES
router.get("/users", controller.user.getUsers);
router.get("/users/:id", controller.user.getUser);
router.post("/users", controller.user.createUser);
router.put("/users/:id", controller.user.updateUser);
router.delete("/users/:id", controller.user.deleteUser);

/* flow */
router.get(prefix + Interface.ready, controller.flow.ready);
router.get(prefix + Interface.endRound, controller.flow.endRound);
router.get(prefix + Interface.reconnect, controller.flow.reconnect);

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
router.get(prefix + Interface.drawCard, controller.player.drawCard);
router.post(
  prefix + Interface.useHarvestCard,
  controller.player.useHarvestCard
);

export { router };
