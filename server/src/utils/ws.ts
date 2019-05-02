import * as WebSocket from "ws";
import Event from "../../../client/src/ws-dispatch/event";
import { PlayerId } from "player";

const wss = new WebSocket.Server({ port: 9001 });

const wsList: WebSocket[] = [];

// let ws: any;

// wss.broadcast = function broadcast(data: any) {
//   wss.clients.forEach(function each(client: any) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// };

wss.on("connection", w => {
  console.log("server connection");
  w.on("message", receiveMessage);
});

function receiveMessage(message: WebSocket.Data) {
  try {
    const { type, payload } = JSON.parse(message.toString());
    switch (type) {
      case Event.BindPlayer:
        this.playerId = +payload.playerId;
        break;
    }
  } catch (e) {
    console.log(`普通消息:${message}`);
  }
}

interface ClientWithExtra extends WebSocket {
  playerId: PlayerId;
}

export function broadcast(data: any) {
  wss.clients.forEach(function each(client: ClientWithExtra) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

export function sendTo(playerId: PlayerId, data: any) {
  wss.clients.forEach(function each(client: ClientWithExtra) {
    if (client.playerId === playerId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

export { wss };
