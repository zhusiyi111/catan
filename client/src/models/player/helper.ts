import { PlayerId, Players, Player } from ".";

export const PlayerIdKey = "playerId";

export function getPlayerId() {
  const val = localStorage.getItem(PlayerIdKey);
  return val ? +val : -1;
}

export function setPlayerId(playerId: PlayerId) {
  localStorage.setItem(PlayerIdKey, "" + playerId);
}

export function getPlayer(playerId: PlayerId, players: Players) {
  return players.find(v => v.id === playerId);
}
