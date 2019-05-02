import { Areas } from "area";
import { PlayerId, Players } from "player";
import { Roll } from "roll";
import { Villages } from "village";

type MatchId = number;

export type Store = WaitingGameStore | InGameStore;


export interface WaitingGameStore {
  matchId: MatchId;
  round: number;
  waitingList: PlayerId[];
}

export interface InGameStore {
  matchId: MatchId;
  areas: Areas;
  currentPlayer: PlayerId;
  players: Players;
  roll: Roll;
  round: number;
  villages: Villages;
}
