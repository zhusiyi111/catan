import { Players, PlayerId, Player } from "../player";
import { Villages, VillageType } from ".";

export function getPlayer(playerId: PlayerId, players: Players) {
  return players.find(v => v.id === playerId);
}

export function hasTown(villages: Villages, playerId: PlayerId) {
  return villages.some(
    v => v.type === VillageType.Town && v.owner === playerId
  );
}