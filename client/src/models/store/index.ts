import { Areas } from "../area";
import { PlayerId, Players } from "../player";
import { Roll } from "../roll";
import { Villages } from "../village";

type MatchId = number;

export interface InGameStore {
  matchId: MatchId;
  areas: Areas;
  currentPlayer: PlayerId;
  players: Players;
  roll: Roll;
  round: number;
  villages: Villages;
}
