import { Resource, ResourceType } from "../resource";
import { State } from "..";
import { Cards } from "../card";
import { drawCard, useHarvestCard } from "../card/service";
import { dealInBlackMarket } from "./service";

export type PlayerId = number;

export type Score = number;

export type Volume = number;

export interface Player {
  name: string;
  id: PlayerId;
  color: string;
  resource: Resource;
  cards: Cards;
  score: Score;
  volume: Volume;
}

export type Players = Player[];

const initialState: Players = [];

export default {
  state: initialState,
  reducers: {
    changeStatus: (s: Players) => {
      return s;
    },
    updatePlayers: (s: Players, p: Players) => {
      return p;
    }
  },
  effects: (dispatch: any) => ({
    drawCard() {
      drawCard();
    },
    async useHarvestCard(type: ResourceType) {
      const res = await useHarvestCard(type);
      if (res.success) {
      }
    },
    async dealInBlackMarket({
      giveResource,
      gainResource
    }: {
      giveResource: Resource;
      gainResource: Resource;
    }) {
      const res = await dealInBlackMarket(giveResource, gainResource);
      if (res.success) {
      }
    }
  }),
  selectors: (slice: any) => ({
    total() {
      return slice((players: Players) => players.length);
    },
    items() {
      return slice;
    }
  })
};
