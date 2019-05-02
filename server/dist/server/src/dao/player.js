"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("../utils/ws");
const event_1 = require("../../../client/src/ws-dispatch/event");
function broadcastDrawCard({ players, playerId }) {
    ws_1.broadcast({
        type: event_1.default.DrawCard,
        payload: {
            players,
            playerId
        }
    });
}
exports.broadcastDrawCard = broadcastDrawCard;
function broadcastUseHarvestCard({ players, playerId }) {
    ws_1.broadcast({
        type: event_1.default.UseHarvestCard,
        payload: {
            players,
            playerId
        }
    });
}
exports.broadcastUseHarvestCard = broadcastUseHarvestCard;
/* 使用士兵卡 */
function broadcaseUseArmyCard({ areas, players, playerId }) {
    ws_1.broadcast({
        type: event_1.default.UseArmyCard,
        payload: {
            players,
            areas,
            playerId
        }
    });
}
exports.broadcaseUseArmyCard = broadcaseUseArmyCard;
//# sourceMappingURL=player.js.map