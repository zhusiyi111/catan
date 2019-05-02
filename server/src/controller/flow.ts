import { BaseContext } from "koa";
import { range } from "lodash";
import { Areas, AreaExtendType, AreaType, AreaTypeToName } from "../types/area";
import {
  updateInGameStore,
  getInGameStore,
  broadcastStore,
  getWaitingStore,
  updateWaitingStore,
  robDice
} from "../dao/flow";
import { updateResource } from "../service/resource";
import { WaitingGameStore, InGameStore } from "store";
import { PlayerId, Players } from "../types/player";
import { ResourceType } from "../types/resource";
import { sendTo, broadcast } from "../utils/ws";
import Event from "../../../client/src/ws-dispatch/event";
import { calcPlayersScore } from "../service/score";
import { findWinner } from "../service/score";
import { DefaultVolume } from "../config";
import { DefaultResource, PlayerNumber } from "../config";
import { rollBetween, doubleRoll, rollBetweenArr } from "../service/roll";
import { isForbidArea } from "../service/area";
import round from "../../../client/src/models/round";

const RobDiceNum = 7;

function randomAreaType() {
  const resourceList = [
    ResourceType.Brick,
    ResourceType.Ore,
    ResourceType.Sheep,
    ResourceType.Wheat,
    ResourceType.Wood
  ];
  const index = rollBetween(0, resourceList.length - 1);

  // TODO:return real type
  return resourceList[index];
}

function getAreaName(type: AreaType) {
  return AreaTypeToName[type];
}

function generateAreas(width: number, height: number): Areas {
  const areas = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const area: any = {
        location: {
          x,
          y
        },
        number: rollBetweenArr(range(2, 6).concat(range(8, 12)))
      };
      if (isForbidArea(x, y)) {
        area.type = AreaExtendType.Desert;
        area.number = RobDiceNum;
      } else {
        area.type = randomAreaType();
      }
      area.name = getAreaName(area.type);

      areas.push(area);
    }
  }

  return areas;
}

function generatePlayers(playerIds: PlayerId[]): Players {
  const color = [
    "#d9534f",
    "#418bca",
    "#5cb85c",
    "#418bca",
    "#a841ca"
  ].reverse();
  return playerIds.map((id, i) => {
    return {
      id,
      name: `玩家${id}`,
      sort: i,
      resource: DefaultResource,
      cards: [],
      score: 0,
      volume: DefaultVolume,
      color: color.pop()
    };
  });
}

function generateInitialStore(
  playerIds: PlayerId[],
  matchId: number
): InGameStore {
  const playersNum = playerIds.length;
  const areaSize = playersNum + 2;

  const areas = generateAreas(areaSize, areaSize);

  const players = generatePlayers(playerIds);

  return {
    matchId,
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

async function newRound(matchId: number, round: number) {
  const store: InGameStore = await getInGameStore(matchId, round);

  const { players, currentPlayer, areas, villages } = store;

  // 计算分数
  const scoreMap = calcPlayersScore(villages, players);

  // 更新分数
  players.map(v => {
    v.score = scoreMap[v.id];
  });

  // 取player数组，确定下一个player
  const curIndex = players.findIndex((v: any) => v.id === currentPlayer);
  let nextIndex;

  if (
    curIndex === undefined ||
    curIndex === -1 ||
    curIndex + 1 >= players.length
  ) {
    nextIndex = 0;
  } else {
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
  const newPlayers = updateResource(players, rollA + rollB, areas, villages);
  store.players = newPlayers;

  // 回合数+1
  const newRound = store.round + 1;
  store.round = newRound;

  // 存
  const res = await updateInGameStore(store);

  // 判断胜负
  const winner = findWinner(scoreMap);
  if (winner !== undefined) {
    console.log(`比赛id:${matchId}结束了，获胜者id:${winner}`);
    broadcastStore(store);
    broadcast({
      type: Event.GameOver,
      payload: {
        winner: winner
      }
    });
    return;
  }

  console.log(
    `比赛id:${matchId}进入第${round}轮,本轮玩家:${store.currentPlayer}`
  );
  // 广播新状态
  broadcastStore(store);

  // 如果骰子是强盗，给当前player发一条抢夺消息
  if (store.roll.rollA + store.roll.rollB === RobDiceNum) {
    robDice(store.currentPlayer);
  }
}

/* 判断是否可以开始游戏了 */
async function addPlayerToMatch(matchId: number, playerId: number) {
  let store = await getWaitingStore(+matchId);
  // 如果没有的话，新建一把游戏
  if (!store) {
    const initialStore: WaitingGameStore = {
      matchId,
      waitingList: [playerId],
      round: -1
    };
    await updateWaitingStore(initialStore);
    store = await getWaitingStore(+matchId);
  }
  const { waitingList } = store;
  if (!waitingList.includes(playerId)) {
    waitingList.push(playerId);
  }

  // 更新waitingList
  store.waitingList = waitingList;
  await updateWaitingStore(store);

  // TODO：广播新加的人
}

async function startGame(players: PlayerId[], matchId: number) {
  // 生成初始数据
  const initialStore = generateInitialStore(players, matchId);

  const { round } = initialStore;
  const res = await updateInGameStore(initialStore);

  // 开始新回合
  newRound(matchId, round);
}

export default class Flow {
  static async ready(ctx: BaseContext) {
    let { matchId, playerId } = ctx.query;
    matchId = +matchId;
    playerId = +playerId;
    await addPlayerToMatch(+matchId, +playerId);

    const store = await getWaitingStore(matchId);
    const { waitingList } = store;
    // 人数够了，开始游戏
    if (waitingList.length >= PlayerNumber) {
      console.log(`人齐了，开始.matchId:${matchId},waitingList:${waitingList}`);
      startGame(waitingList, matchId);
    }
    ctx.body = 200;
  }

  static async endRound(ctx: BaseContext) {
    const { matchId, round } = ctx.query;
    // TODO 检查胜负状态

    // newRound
    newRound(matchId, round);
  }

  static roll() {
    // roll点 广播
  }

  static endGame(matchId: number) {
    // 做一些收尾工作
  }

  /* 重连 */
  static async reconnect(ctx: BaseContext) {
    let { playerId, matchId } = ctx.query;
    playerId = +playerId;
    matchId = +matchId;

    const store: InGameStore = await getInGameStore(
      matchId,
      round ? +round : undefined
    );

    sendTo(playerId, {
      type: Event.UpdateStore,
      payload: store
    });
    ctx.body = "ok";
  }
}
