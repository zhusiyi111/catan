import { BaseContext } from "koa";
import { getInGameStore, updateInGameStore } from "../dao/flow";
import { getPlayer, removeCard } from "./player";
import { getAreaFromLocation, removeRobberInAllAreas } from "../service/area";
import { getVillagesAroundArea } from "../service/village";
import { CardType } from "../types/card";
import { broadcaseUseArmyCard, broadcaseRobAreaFromDice } from "../dao/player";

export default class AreaController {
  static async selectRobberAreaCauseArmy(ctx: BaseContext) {
    let { matchId, playerId } = ctx.query;
    matchId = +matchId;
    playerId = +playerId;
    let { x, y, isRobDice } = ctx.request.body;

    const store = await getInGameStore(matchId);
    const { villages, players, areas } = store;

    const targetArea = getAreaFromLocation({ x, y }, areas);
    const targetVillages = getVillagesAroundArea(targetArea, villages);

    /* TDOO 校验是否可以派强盗到某area */

    /* 移除所有area的强盗 */
    removeRobberInAllAreas(areas);
    /* 放置强盗 */
    targetArea.hasRobber = true;

    const player = getPlayer(playerId, players);
    const { cards, id } = player;

    /* 如果是士兵卡触发的，扣卡 */
    if (isRobDice !== true) {
      removeCard(CardType.Army, cards);
    }

    // 存
    await updateInGameStore(store);

    // 广播
    if (isRobDice === true) {
      broadcaseRobAreaFromDice({
        areas: store.areas,
        players: store.players,
        playerId: id
      });
    } else {
      broadcaseUseArmyCard({
        areas: store.areas,
        players: store.players,
        playerId: id
      });
    }

    /* 筛选出非自己的village */
    const robVillages = targetVillages
      .filter(v => v.village.owner !== playerId)
      .map(v => v.village.location);

    /* 返回前端，使前端继续rob village */
    ctx.body = {
      success: true,
      data: {
        robVillages
      }
    };
  }
}
