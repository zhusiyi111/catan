import { Players, PlayerId, Score, Player } from "../types/player";
import { Villages } from "../types/village";
import { Cards, CardType } from "../types/card";
import { BaseContext } from "koa";
import {
  BuildScoreMap as _BuildScoreMap,
  ScoreCard,
  WinNeedScore
} from "../../../client/src/const.json";

const BuildScoreMap: { [i: string]: number } = _BuildScoreMap;

export function calcPlayersScore(
  villages: Villages,
  players: Players
): { [i: string]: Score } {
  return players.reduce((acc: { [i: string]: Score }, v) => {
    const { id } = v;
    acc[id] = calcPlayerScore(villages, v);
    return acc;
  }, {});
}

export function calcPlayerScore(villages: Villages, player: Player) {
  const buildingScore = calcVillagesScore(player.id, villages);
  const cardScore = calcCardScore(player.cards);
  return buildingScore + cardScore;
}

/* 计算建筑分数（包括奇观） */
export function calcVillagesScore(playerId: PlayerId, villages: Villages) {
  const filters = villages.filter(v => v.owner === playerId);
  const score = filters.reduce((acc, { type }) => {
    return acc + BuildScoreMap[type];
  }, 0);
  return score;
}

/* 计算卡片分数 */
export function calcCardScore(cards: Cards): Score {
  return cards.filter(v => v.type === CardType.Score).length * ScoreCard;
}

/* 判断胜利者 */
export function findWinner(scoreMap: {
  [i: string]: Score;
}): PlayerId | undefined {
  for (let i in scoreMap) {
    if (scoreMap[i] >= WinNeedScore) {
      return +i;
    }
  }
  return undefined;
}

/* 返回playerId与matchId */
export function getPlayerAndMatchId(ctx: BaseContext) {
  let { playerId, matchId } = ctx.query;
  playerId = +playerId;
  matchId = +matchId;
  return { playerId, matchId };
}
