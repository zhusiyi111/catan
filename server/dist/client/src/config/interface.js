"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prefix = "/api";
exports.prefix = prefix;
const domain = "catan.net";
exports.domain = domain;
const Path = {
    /* flow */
    ready: `/flow/ready`,
    endRound: `/flow/endRound`,
    reconnect: `/flow/reconnect`,
    /* village */
    buildVillage: `/village/build`,
    upgradeVillage: `/village/upgrade`,
    upgradeCity: `/village/upgrade/city`,
    /* area */
    selectRobberArea: `/area/selectRobber`,
    /* card */
    drawCard: `/player/drawCard`,
    useHarvestCard: `/player/useHarvestCard`
};
exports.Path = Path;
const Interface = Path;
exports.Interface = Interface;
//# sourceMappingURL=interface.js.map