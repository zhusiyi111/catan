"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const event_1 = require("../../../client/src/ws-dispatch/event");
const wss = new WebSocket.Server({ port: 9001 });
exports.wss = wss;
const wsList = [];
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
function receiveMessage(message) {
    try {
        const { type, payload } = JSON.parse(message.toString());
        switch (type) {
            case event_1.default.BindPlayer:
                this.playerId = +payload.playerId;
                break;
        }
    }
    catch (e) {
        console.log(`普通消息:${message}`);
    }
}
function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
exports.broadcast = broadcast;
function sendTo(playerId, data) {
    wss.clients.forEach(function each(client) {
        if (client.playerId === playerId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
exports.sendTo = sendTo;
//# sourceMappingURL=ws.js.map