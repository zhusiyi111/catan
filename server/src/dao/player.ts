import { broadcast } from "../utils/ws";
import Event from "../../../client/src/ws-dispatch/event";
import { Players, PlayerId } from "../types/player";
import { Areas } from "../types/area";
import { IVillage } from "village";
import { Resource } from "resource";

export function broadcastDrawCard({
  players,
  playerId
}: {
  players: Players;
  playerId: PlayerId;
}) {
  broadcast({
    type: Event.DrawCard,
    payload: {
      players,
      playerId
    }
  });
}

export function broadcastUseHarvestCard({
  players,
  playerId
}: {
  players: Players;
  playerId: PlayerId;
}) {
  broadcast({
    type: Event.UseHarvestCard,
    payload: {
      players,
      playerId
    }
  });
}

/* 使用士兵卡 */
export function broadcaseUseArmyCard({
  areas,
  players,
  playerId
}: {
  areas: Areas;
  players: Players;
  playerId: PlayerId;
}) {
  broadcast({
    type: Event.UseArmyCard,
    payload: {
      players,
      areas,
      playerId
    }
  });
}

/* 强盗抢area */
export function broadcaseRobAreaFromDice({
  areas,
  players,
  playerId
}: {
  areas: Areas;
  players: Players;
  playerId: PlayerId;
}) {
  broadcast({
    type: Event.RobAreaFromDice,
    payload: {
      players,
      areas,
      playerId
    }
  });
}

/* rob结果 */
export function broadcaseRobResult({
  players,
  robPlayerId,
  village,
  resource
}: {
  players: Players;
  robPlayerId: PlayerId;
  village: IVillage;
  resource: Resource;
}) {
  broadcast({
    type: Event.RobResult,
    payload: {
      players,
      robPlayerId,
      village,
      resource
    }
  });
}

export function broadcastDealInBlackMarket({
  players,
  playerId,
  gainResource
}: {
  players: Players;
  playerId: PlayerId;
  gainResource: Resource;
}) {
  broadcast({
    type: Event.DealInBlackMarket,
    payload: {
      players,
      playerId,
      gainResource
    }
  });
}
