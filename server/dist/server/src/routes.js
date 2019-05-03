"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller = require("./controller");
const interface_1 = require("../../client/src/config/interface");
const router = new Router();
exports.router = router;

/* flow */
router.post(interface_1.prefix + interface_1.Interface.ready, controller.flow.ready);
router.post(interface_1.prefix + interface_1.Interface.endRound, controller.flow.endRound);
router.post(interface_1.prefix + interface_1.Interface.reconnect, controller.flow.reconnect);
// Village
router.post(interface_1.prefix + interface_1.Interface.buildVillage, controller.village.buildVillage);
router.post(interface_1.prefix + interface_1.Interface.upgradeVillage, controller.village.upgradeVillage);
/* area */
router.post(interface_1.prefix + interface_1.Interface.selectRobberArea, controller.area.selectRobberAreaCauseArmy);
/* card */
router.post(interface_1.prefix + interface_1.Interface.drawCard, controller.player.drawCard);
router.post(interface_1.prefix + interface_1.Interface.useHarvestCard, controller.player.useHarvestCard);
//# sourceMappingURL=routes.js.map