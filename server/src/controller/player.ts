import { BaseContext } from "koa";
import { getInGameStore, updateInGameStore } from "../dao/flow";
import { Players, PlayerId } from "../types/player";
import { ResourceType, Resource } from "../types/resource";
import { randomPercent } from "../utils/random";
import {
  CardType,
  Card,
  Cards,
  CardTypeToName,
  HarvestAddNum
} from "../types/card";
import {
  broadcastDrawCard,
  broadcastUseHarvestCard,
  broadcastDealInBlackMarket
} from "../dao/player";
import { getPlayerAndMatchId } from "../service/score";
import { reduceResource, addResource } from "../service/resource";

export function getPlayer(playerId: PlayerId, players: Players) {
  return players.find(v => v.id === playerId);
}

function canDrawCard(resource: Resource) {
  return (
    resource[ResourceType.Ore] >= 1 &&
    resource[ResourceType.Wheat] >= 1 &&
    resource[ResourceType.Sheep] >= 1
  );
}

function changeResourceCauseDrawCard(resource: Resource) {
  // TODO 接const.json
  resource[ResourceType.Ore] -= 1;
  resource[ResourceType.Wheat] -= 1;
  resource[ResourceType.Sheep] -= 1;
}

/* 加牌 */
function addCardToPlayer(cards: Cards) {
  const rate = randomPercent();

  const probabilityMap = {
    [CardType.Army]: 50,
    [CardType.Score]: 80,
    [CardType.Harvest]: 100,
    // [CardType.Monopoly]: 100
  };

  let cardType: CardType;

  if (rate <= probabilityMap[CardType.Army]) {
    cardType = CardType.Army;
  } else if (rate <= probabilityMap[CardType.Score]) {
    cardType = CardType.Score;
  } else if (rate <= probabilityMap[CardType.Harvest]) {
    cardType = CardType.Harvest;
  } else {
    cardType = CardType.Monopoly;
  }

  const newCard: Card = {
    type: cardType,
    name: CardTypeToName[cardType]
  };
  cards.push(newCard);
}

/* 收回某类型的牌 */
export function removeCard(type: CardType, cards: Cards) {
  const index = cards.findIndex(v => v.type === type);
  cards.splice(index, 1);
}

/* 丰收卡加资源 */
function addResourceCauseHarvestCard(type: ResourceType, resource: Resource) {
  resource[type] += HarvestAddNum;
}

export default class PlayerController {
  public static async drawCard(ctx: BaseContext) {
    let { playerId, matchId } = getPlayerAndMatchId(ctx);
    const store = await getInGameStore(matchId);
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
    await updateInGameStore(store);

    // 广播抽牌消息
    broadcastDrawCard({ players: store.players, playerId });

    ctx.body = "ok";
  }

  static async useHarvestCard(ctx: BaseContext) {
    let { playerId, matchId } = getPlayerAndMatchId(ctx);

    const { type } = ctx.request.body;

    const store = await getInGameStore(matchId);
    const { players } = store;
    const player = getPlayer(playerId, players);
    const { cards, resource } = player;

    // TODO:校验是否有丰收卡

    // 加资源
    addResourceCauseHarvestCard(type, resource);

    // 减牌
    removeCard(CardType.Harvest, cards);

    // 存
    await updateInGameStore(store);

    // 广播用牌消息
    broadcastUseHarvestCard({ players: store.players, playerId });

    ctx.body = { success: true };
  }

  /* 黑市交易 */
  static async dealInBlackMarket(ctx: BaseContext) {
    let { playerId, matchId } = getPlayerAndMatchId(ctx);

    const { giveResource, gainResource } = ctx.request.body;

    const store = await getInGameStore(matchId);
    const { players } = store;
    const player = getPlayer(playerId, players);
    const { resource } = player;

    // TODO:校验是否有丰收卡

    // 减资源
    reduceResource(resource, giveResource);

    // 加资源
    addResource(resource, gainResource);

    // 存
    await updateInGameStore(store);

    // 广播黑市消息
    broadcastDealInBlackMarket({
      players: store.players,
      gainResource,
      playerId
    });

    ctx.body = { success: true };
  }
}
