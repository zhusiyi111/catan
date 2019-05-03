import { post } from "../../utils/request";
import { wsSend } from "../../utils/ws";
import { Interface } from "../../config/interface";
import { PlayerId } from "../player";
import Event from "../../ws-dispatch/event";

export const bindPlayer = (playerId: PlayerId) => {
  wsSend(Event.BindPlayer, { playerId });
};

export const ready = () => post(Interface.ready);

export const endRound = () => post(Interface.endRound);

export const reconnect = () => post(Interface.reconnect);
