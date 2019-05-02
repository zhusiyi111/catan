import { Resource } from "./resource";
import { Cards } from "./card";
import { Volume } from "./volume";

export type PlayerId = number;

export type Score = number;

export type PlayerColor = string;

export interface Player {
  name: string;
  id: PlayerId;
  resource: Resource;
  sort: number;
  cards: Cards;
  score: Score;
  volume: Volume;
  color: PlayerColor;
}

export type Players = Player[];
