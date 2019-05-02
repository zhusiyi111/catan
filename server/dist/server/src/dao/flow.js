"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../utils/redis");
const ws_1 = require("../utils/ws");
const event_1 = require("../../../client/src/ws-dispatch/event");
function updateInGameStore(store) {
    const { matchId, round } = store;
    // 这次是为了备份
    redis_1.redis.set(`${matchId}|${round}`, JSON.stringify(store));
    // 这次是为了存最新的
    return redis_1.redis.set(`${matchId}|latest`, JSON.stringify(store));
}
exports.updateInGameStore = updateInGameStore;
function getInGameStore(matchId, round) {
    return redis_1.redis
        .get(`${matchId}|${round !== undefined ? round : "latest"}`)
        .then(v => JSON.parse(v));
}
exports.getInGameStore = getInGameStore;
function updateWaitingStore(store) {
    const { matchId } = store;
    return redis_1.redis.set(`${matchId}|-1`, JSON.stringify(store));
}
exports.updateWaitingStore = updateWaitingStore;
function getWaitingStore(matchId) {
    return redis_1.redis.get(`${matchId}|-1`).then(v => JSON.parse(v));
}
exports.getWaitingStore = getWaitingStore;
function broadcastStore(store) {
    ws_1.broadcast({
        type: event_1.default.NewRound,
        payload: store
    });
}
exports.broadcastStore = broadcastStore;
//# sourceMappingURL=flow.js.map