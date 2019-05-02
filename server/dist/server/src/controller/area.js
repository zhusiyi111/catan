"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flow_1 = require("../dao/flow");
const player_1 = require("./player");
const area_1 = require("../service/area");
const village_1 = require("../service/village");
const card_1 = require("../types/card");
const player_2 = require("../dao/player");
class AreaController {
    static async selectRobberAreaCauseArmy(ctx) {
        let { matchId, playerId } = ctx.query;
        matchId = +matchId;
        playerId = +playerId;
        let { x, y } = ctx.request.body;
        const store = await flow_1.getInGameStore(matchId);
        const { villages, players, areas } = store;
        const targetArea = area_1.getAreaFromLocation({ x, y }, areas);
        const targetVillages = village_1.getVillagesAroundArea(targetArea, villages);
        /* TDOO 校验是否可以派强盗到某area */
        /* 移除所有area的强盗 */
        area_1.removeRobberInAllAreas(areas);
        /* 放置强盗 */
        targetArea.hasRobber = true;
        /* 扣除卡 */
        const player = player_1.getPlayer(playerId, players);
        const { cards, id } = player;
        player_1.removeCard(card_1.CardType.Army, cards);
        // 存
        await flow_1.updateInGameStore(store);
        // 广播
        player_2.broadcaseUseArmyCard({
            areas: store.areas,
            players: store.players,
            playerId: id
        });
        ctx.body = "ok";
    }
}
exports.default = AreaController;
//# sourceMappingURL=area.js.map