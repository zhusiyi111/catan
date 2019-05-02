import { PlayerId, Players } from "../types/player";

export function findPlayer(playerId: PlayerId, players: Players) {
  return players.find(v => v.id === playerId);
}
