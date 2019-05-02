import { broadcast } from "../utils/ws";
import Event from "../../../client/src/ws-dispatch/event";
import { Players } from "player";
import { Villages } from "village";

export function broadcastBuildVillage({
  players,
  villages
}: {
  players: Players;
  villages: Villages;
}) {
  broadcast({
    type: Event.BuildVillage,
    payload: {
      players,
      villages
    }
  });
}

export function broadcaseUpgradeCity({
  players,
  villages
}: {
  players: Players;
  villages: Villages;
}) {
  broadcast({
    type: Event.UpgradeCity,
    payload: {
      players,
      villages
    }
  });
}
