import wsDispatch from "../ws-dispatch";
import { bindPlayer, reconnect } from "../models/flow/service";
import { getPlayerId } from "../models/player/helper";
import { wsPrefix, domain } from "../config/interface";

const ws = new WebSocket(`ws://${domain}${wsPrefix}`);

ws.onopen = () => {
  ws.send(`player ${getPlayerId()} join`);
  bindPlayer(getPlayerId());

  /* 在game页面，等ws连通后，刷新下 */
  if (window.location.href.includes("/game")) {
    setTimeout(() => {
      reconnect();
    }, 100);
  }
};

ws.onmessage = e => {
  wsDispatch(e.data);
};

// ws.onclose = e => {
//     console.log("WebSocket onclose");
// };

export function wsSend(type: string, payload: any) {
  ws.send(
    JSON.stringify({
      type,
      payload
    })
  );
}

export default ws;
