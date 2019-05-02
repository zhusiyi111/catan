import { Players, PlayerId, Score, Player } from "../types/player";
import { Villages, VillageType } from "../types/village";
import { Cards, CardType } from "../types/card";

/* 建筑得分 */
const BuildScoreMap: { [i: string]: number } = {
  [VillageType.Town]: 1,
  [VillageType.City]: 2,
  [VillageType.Warehouse]: 2,
  [VillageType.Castle]: 2,
  [VillageType.Wonder]: 3
};

/* 分数卡得分 */
const ScoreCard = 1;

/* 获胜所需 */
const WinNeedScore = 10;

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
