"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flow_1 = require("../dao/flow");
const resource_1 = require("../types/resource");
const random_1 = require("../utils/random");
const card_1 = require("../types/card");
const player_1 = require("../dao/player");
function getPlayer(playerId, players) {
    return players.find(v => v.id === playerId);
}
exports.getPlayer = getPlayer;
function canDrawCard(resource) {
    return (resource[resource_1.ResourceType.Ore] >= 1 &&
        resource[resource_1.ResourceType.Wheat] >= 1 &&
        resource[resource_1.ResourceType.Sheep] >= 1);
}
function changeResourceCauseDrawCard(resource) {
    resource[resource_1.ResourceType.Ore] -= 1;
    resource[resource_1.ResourceType.Wheat] -= 1;
    resource[resource_1.ResourceType.Sheep] -= 1;
}
/* 加牌 */
function addCardToPlayer(cards) {
    const rate = random_1.randomPercent();
    const probabilityMap = {
        [card_1.CardType.Army]: 50,
        [card_1.CardType.Score]: 75,
        [card_1.CardType.Harvest]: 90,
        [card_1.CardType.Monopoly]: 100
    };
    let cardType;
    if (rate <= probabilityMap[card_1.CardType.Army]) {
        cardType = card_1.CardType.Army;
    }
    else if (rate <= probabilityMap[card_1.CardType.Score]) {
        cardType = card_1.CardType.Score;
    }
    else if (rate <= probabilityMap[card_1.CardType.Harvest]) {
        cardType = card_1.CardType.Harvest;
    }
    else {
        cardType = card_1.CardType.Monopoly;
    }
    const newCard = {
        type: cardType,
        name: card_1.CardTypeToName[cardType]
    };
    cards.push(newCard);
}
/* 收回某类型的牌 */
function removeCard(type, cards) {
    const index = cards.findIndex(v => v.type === type);
    cards.splice(index, 1);
}
exports.removeCard = removeCard;
/* 丰收卡加资源 */
function addResourceCauseHarvestCard(type, resource) {
    resource[type] += card_1.HarvestAddNum;
}
class PlayerController {
    static async drawCard(ctx) {
        let { playerId, matchId } = ctx.query;
        playerId = +playerId;
        matchId = +matchId;
        const store = await flow_1.getInGameStore(matchId);
        const { players } = store;
        const player = getPlayer(playerId, players);
        // 校验抽牌条件
        const canDrawCardResult = canDrawCard(player.resource);
        if (!canDrawCardResult) {
            ctx.body = "资源不足";
            return;
        }
        // 扣资源
        changeResourceCauseDrawCard(player.resource);
        // 加牌
        addCardToPlayer(player.cards);
        // 存
        await flow_1.updateInGameStore(store);
        // 广播抽牌消息
        player_1.broadcastDrawCard({ players: store.players, playerId });
        ctx.body = "ok";
    }
    static async useHarvestCard(ctx) {
        let { playerId, matchId } = ctx.query;
        playerId = +playerId;
        matchId = +matchId;
        const { type } = ctx.request.body;
        const store = await flow_1.getInGameStore(matchId);
        const { players } = store;
        const player = getPlayer(playerId, players);
        const { cards, resource } = player;
        // TODO:校验是否有丰收卡
        // 加资源
        addResourceCauseHarvestCard(type, resource);
        // 减牌
        removeCard(card_1.CardType.Harvest, cards);
        // 存
        await flow_1.updateInGameStore(store);
        // 广播用牌消息
        player_1.broadcastUseHarvestCard({ players: store.players, playerId });
        ctx.body = { success: true };
    }
}
exports.default = PlayerController;
//# sourceMappingURL=player.js.map