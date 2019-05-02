import { MatchId } from ".";

export const MatchIdKey = "matchId";

export function getMatchId() {
  const val = localStorage.getItem(MatchIdKey);
  return val ? +val : -1;
}

export function setMatchId(matchId: MatchId) {
  localStorage.setItem(MatchIdKey, "" + matchId);
}
