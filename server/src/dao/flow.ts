import { redis } from "../utils/redis";
import { broadcast, sendTo } from "../utils/ws";
import { Store, WaitingGameStore, InGameStore } from "store";
import Event from "../../../client/src/ws-dispatch/event";
import { PlayerId } from "../../../client/src/models/player";

export async function updateInGameStore(store: InGameStore) {
  const { matchId, round } = store;
  // 这次是为了备份
  await redis.set(`${matchId}|${round}`, JSON.stringify(store));
  // 这次是为了存最新的
  const res = await redis.set(`${matchId}|latest`, JSON.stringify(store));
  return res;
}

export function getInGameStore(
  matchId: number,
  round?: number
): Promise<InGameStore> {
  return redis
    .get(
      `${matchId}|${typeof round === "number" && round >= 0 ? round : "latest"}`
    )
    .then(v => JSON.parse(v));
}

export function updateWaitingStore(store: WaitingGameStore) {
  const { matchId } = store;
  return redis.set(`${matchId}|-1`, JSON.stringify(store));
}

export function getWaitingStore(matchId: number): Promise<WaitingGameStore> {
  return redis.get(`${matchId}|-1`).then(v => JSON.parse(v));
}

export function broadcastStore(store: Store) {
  broadcast({
    type: Event.NewRound,
    payload: store
  });
}

export function robDice(playerId: PlayerId) {
  broadcast({
    type: Event.RobDice,
    payload: {
      playerId
    }
  });
}
