import { get } from "../../utils/request";
import { wsSend } from "../../utils/ws";
import { Interface } from "../../config/interface";
import { Round } from "../round";
import { getPlayerId } from "../player/helper";
import { PlayerId } from "../player";
import Event from "../../ws-dispatch/event";

export const bindPlayer = (playerId: PlayerId) => {
  wsSend(Event.BindPlayer, { playerId });
};

export const ready = (playerId: number) =>
  get(Interface.ready, {
    playerId
  });

export const endRound = (round: Round) => get(Interface.endRound, { round });

export const reconnect = () =>
  get(Interface.reconnect, {
    playerId: getPlayerId()
  });
