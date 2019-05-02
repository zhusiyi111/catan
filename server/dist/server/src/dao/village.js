"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("../utils/ws");
const event_1 = require("../../../client/src/ws-dispatch/event");
function broadcastBuildVillage({ players, villages }) {
    ws_1.broadcast({
        type: event_1.default.BuildVillage,
        payload: {
            players,
            villages
        }
    });
}
exports.broadcastBuildVillage = broadcastBuildVillage;
function broadcaseUpgradeCity({ players, villages }) {
    ws_1.broadcast({
        type: event_1.default.UpgradeCity,
        payload: {
            players,
            villages
        }
    });
}
exports.broadcaseUpgradeCity = broadcaseUpgradeCity;
//# sourceMappingURL=village.js.map