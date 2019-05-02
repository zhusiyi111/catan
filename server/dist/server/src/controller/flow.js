"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("../types/area");
const flow_1 = require("../dao/flow");
const resource_1 = require("../service/resource");
const resource_2 = require("../types/resource");
const ws_1 = require("../utils/ws");
const event_1 = require("../../../client/src/ws-dispatch/event");
const score_1 = require("../service/score");
const score_2 = require("../service/score");
const volume_1 = require("../types/volume");
const DefaultResource = {
    brick: 3,
    wood: 3,
    wheat: 3,
    sheep: 3,
    ore: 3
};
function doubleRoll() {
    return [rollBetween(1, 6), rollBetween(1, 6)];
}
function rollBetween(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}
function isForbidArea(x, y) {
    return x % 2 !== 0 && y % 2 !== 0;
}
function randomAreaType() {
    const resourceList = [
        resource_2.ResourceType.Brick,
        resource_2.ResourceType.Ore,
        resource_2.ResourceType.Sheep,
        resource_2.ResourceType.Wheat,
        resource_2.ResourceType.Wood
    ];
    const index = rollBetween(0, resourceList.length - 1);
    // TODO:return real type
    return resourceList[index];
}
function getAreaName(type) {
    return area_1.AreaTypeToName[type];
}
function generateAreas(width, height) {
    const areas = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const area = {
                location: {
                    x,
                    y
                },
                number: rollBetween(2, 12)
            };
            if (isForbidArea(x, y)) {
                area.type = area_1.AreaExtendType.Desert;
            }
            else {
                area.type = randomAreaType();
            }
            area.name = getAreaName(area.type);
            areas.push(area);
        }
    }
    return areas;
}
function generatePlayers(playerIds) {
    return playerIds.map((id, i) => {
        return {
            id,
            name: `玩家${id}`,
            sort: i,
            resource: DefaultResource,
            cards: [],
            score: 0,
            volume: volume_1.DefaultVolume
        };
    });
}
function generateInitialStore(playerIds) {
    const playersNum = playerIds.length;
    const areaSize = playersNum + 2;
    const areas = generateAreas(areaSize, areaSize);
    const players = generatePlayers(playerIds);
    return {
        matchId: 2,
        round: 0,
        roll: {
            rollA: 0,
            rollB: 0
        },
        currentPlayer: -1,
        areas: areas,
        villages: [],
        players
    };
}
async function newRound(matchId, round) {
    const store = await flow_1.getInGameStore(matchId, round);
    const { players, currentPlayer, areas, villages } = store;
    // 计算分数
    const scoreMap = score_1.calcPlayersScore(villages, players);
    // 更新分数
    players.map(v => {
        v.score = scoreMap[v.id];
    });
    // 取player数组，确定下一个player
    const curIndex = players.findIndex((v) => v.id === currentPlayer);
    let nextIndex;
    if (curIndex === undefined ||
        curIndex === -1 ||
        curIndex + 1 >= players.length) {
        nextIndex = 0;
    }
    else {
        nextIndex = curIndex + 1;
    }
    store.currentPlayer = players[nextIndex].id;
    // roll点
    const [rollA, rollB] = doubleRoll();
    store.roll = {
        rollA,
        rollB
    };
    // 分配资源
    const newPlayers = resource_1.updateResource(players, rollA + rollB, areas, villages);
    store.players = newPlayers;
    // 回合数+1
    const newRound = store.round + 1;
    store.round = newRound;
    // 存
    const res = await flow_1.updateInGameStore(store);
    // 判断胜负
    const winner = score_2.findWinner(scoreMap);
    if (winner !== undefined) {
        console.log(`比赛id:${matchId}结束了，获胜者id:${winner}`);
        flow_1.broadcastStore(store);
        ws_1.broadcast({
            type: event_1.default.GameOver,
            payload: {
                winner: winner
            }
        });
        return;
    }
    console.log(`比赛id:${matchId}进入第${round}轮,本轮玩家:${store.currentPlayer}`);
    // 广播新状态
    flow_1.broadcastStore(store);
}
/* 判断是否可以开始游戏了 */
async function addPlayerToMatch(matchId, playerId) {
    let store = await flow_1.getWaitingStore(+matchId);
    // 如果没有的话，新建一把游戏
    if (!store) {
        const initialStore = {
            matchId,
            waitingList: [playerId],
            round: -1
        };
        await flow_1.updateWaitingStore(initialStore);
        store = await flow_1.getWaitingStore(+matchId);
    }
    const { waitingList } = store;
    if (!waitingList.includes(playerId)) {
        waitingList.push(playerId);
    }
    // 更新waitingList
    store.waitingList = waitingList;
    await flow_1.updateWaitingStore(store);
    // TODO：广播新加的人
}
async function startGame(players) {
    // 生成初始数据
    const initialStore = generateInitialStore(players);
    const { matchId, round } = initialStore;
    const res = await flow_1.updateInGameStore(initialStore);
    // 开始新回合
    newRound(matchId, round);
}
class Flow {
    static async ready(ctx) {
        let { matchId, playerId } = ctx.query;
        matchId = +matchId;
        playerId = +playerId;
        await addPlayerToMatch(+matchId, +playerId);
        const store = await flow_1.getWaitingStore(matchId);
        const { waitingList } = store;
        // 人数大于2，开始游戏
        if (waitingList.length >= 1) {
            console.log(`人齐了，开始.matchId:${matchId},waitingList:${waitingList}`);
            startGame(waitingList);
        }
        ctx.body = 200;
    }
    static async endRound(ctx) {
        const { matchId, round } = ctx.query;
        // TODO 检查胜负状态
        // newRound
        newRound(matchId, round);
    }
    static roll() {
        // roll点 广播
    }
    static endGame(matchId) {
        // 做一些收尾工作
    }
    /* 重连 */
    static async reconnect(ctx) {
        let { playerId, matchId } = ctx.query;
        playerId = +playerId;
        matchId = +matchId;
        const store = await flow_1.getInGameStore(matchId);
        ws_1.sendTo(playerId, {
            type: event_1.default.UpdateStore,
            payload: store
        });
    }
}
exports.default = Flow;
//# sourceMappingURL=flow.js.map