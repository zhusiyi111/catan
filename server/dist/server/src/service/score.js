"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const village_1 = require("../types/village");
const card_1 = require("../types/card");
/* 建筑得分 */
const TownScore = 1;
const CityScore = 2;
const WarehouseScore = 2;
const WonderScore = 3;
/* 分数卡得分 */
const ScoreCard = 1;
/* 获胜所需 */
const WinNeedScore = 10;
function calcPlayersScore(villages, players) {
    return players.reduce((acc, v) => {
        const { id } = v;
        acc[id] = calcPlayerScore(villages, v);
        return acc;
    }, {});
}
exports.calcPlayersScore = calcPlayersScore;
function calcPlayerScore(villages, player) {
    const buildingScore = calcVillagesScore(player.id, villages);
    const cardScore = calcCardScore(player.cards);
    return buildingScore + cardScore;
}
exports.calcPlayerScore = calcPlayerScore;
/* 计算建筑分数（包括奇观） */
function calcVillagesScore(playerId, villages) {
    const filters = villages.filter(v => v.owner === playerId);
    const score = filters.reduce((acc, { type }) => {
        switch (type) {
            case village_1.VillageType.Town:
                acc += TownScore;
                break;
            case village_1.VillageType.City:
                acc += CityScore;
                break;
            case village_1.VillageType.Warehouse:
                acc += WarehouseScore;
                break;
            case village_1.VillageType.Wonder:
                acc += WonderScore;
                break;
            default:
                break;
        }
        return acc;
    }, 0);
    return score;
}
exports.calcVillagesScore = calcVillagesScore;
/* 计算卡片分数 */
function calcCardScore(cards) {
    return cards.filter(v => v.type === card_1.CardType.Score).length * ScoreCard;
}
exports.calcCardScore = calcCardScore;
/* 判断胜利者 */
function findWinner(scoreMap) {
    for (let i in scoreMap) {
        if (scoreMap[i] >= WinNeedScore) {
            return +i;
        }
    }
    return undefined;
}
exports.findWinner = findWinner;
//# sourceMappingURL=score.js.map