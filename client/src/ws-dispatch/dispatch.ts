import store from "../models";
import { InGameStore } from "../models/store";
import { Players, PlayerId } from "../models/player";
import { Villages, IVillage } from "../models/village";
import { log } from "../utils/log";
import { getPlayer } from "../models/village/helper";
import { Areas } from "../models/area";
import { Resource } from "../models/resource";
import { formatResourceToText } from "../models/resource/helper";
import { getPlayerId } from "../models/player/helper";
import { Status } from "../models/status";
import hint from "../components/Hint";
import { getMatchId } from "../models/matchId/helper";
import sound, { SoundType } from "../components/Sound";

const { dispatch } = store;

export function newRound(payload: InGameStore) {
  if (!payload) {
    const playerId = getPlayerId();
    const matchId = getMatchId();

    if (!playerId || !matchId || playerId < 0 || matchId < 0) {
      alert("没登录，出去登录");
      window.location.href = "/";
    } else {
      hint.info({
        message: "等待其他玩家进入"
      });
    }
    return;
  }
  const {
    currentPlayer,
    matchId,
    areas,
    villages,
    round,
    roll,
    players
  } = payload;
  // sound(SoundType.EndTurn).play();
  dispatch.currentPlayer.changePlayer(currentPlayer);
  dispatch.matchId.updateMatchId(matchId);
  dispatch.areas.updateAreas(areas);
  dispatch.villages.updateVillages(villages);
  dispatch.round.updateRound(round);
  dispatch.roll.showRollResult([roll.rollA, roll.rollB]);
  dispatch.players.updatePlayers(players);
}

export const updateStore = newRound;

export function buildVillage({
  players,
  villages
}: {
  players: Players;
  villages: Villages;
}) {
  sound(SoundType.Build).play();
  dispatch.villages.updateVillages(villages);
  dispatch.players.updatePlayers(players);
  dispatch.status.returnMain();
}

/* 抽卡 */
const drawCard = ({
  players,
  playerId
}: {
  players: Players;
  playerId: PlayerId;
}) => {
  const player = getPlayer(playerId, players);
  if (player) {
    const { name } = player;
    log(`${name}抽取了一张发展卡`);
    dispatch.players.updatePlayers(players);
  }
};

/* 使用丰收卡 */
const useHarvestCard = ({
  players,
  playerId
}: {
  players: Players;
  playerId: PlayerId;
}) => {
  const player = getPlayer(playerId, players);
  if (player) {
    const { name } = player;
    log(`${name}使用了丰收卡`);
    dispatch.players.updatePlayers(players);
  }
};

/* 使用士兵卡 */
const useArmyCard = ({
  players,
  playerId,
  areas
}: {
  players: Players;
  playerId: PlayerId;
  areas: Areas;
}) => {
  const player = getPlayer(playerId, players);
  if (player) {
    const { name } = player;
    log(`${name}使用了士兵卡`);
    sound(SoundType.Rob).play();
    dispatch.players.updatePlayers(players);
    dispatch.areas.updateAreas(areas);
  }
};

/* 强盗骰子 抢area */
const robAreaFromDice = ({
  players,
  playerId,
  areas
}: {
  players: Players;
  playerId: PlayerId;
  areas: Areas;
}) => {
  const player = getPlayer(playerId, players);

  if (player) {
    const { name } = player;
    log(`${name}领导强盗`);
    sound(SoundType.Rob).play();
    dispatch.players.updatePlayers(players);
    dispatch.areas.updateAreas(areas);
  }
};

/* 抢夺结果 */
const robResult = ({
  players,
  robPlayerId,
  village,
  resource
}: {
  players: Players;
  robPlayerId: PlayerId;
  village: IVillage;
  resource: Resource;
}) => {
  const { location, owner } = village;
  const robber = getPlayer(robPlayerId, players);

  const robbed = getPlayer(owner, players);
  if (robbed && robber) {
    const robbedName = robber.name;

    const robberName = robbed.name;

    sound(SoundType.RobVillage).play();
    log(`${robberName}抢走了${robbedName}:${formatResourceToText(resource)}`);
    dispatch.villages.robbing(location);
    dispatch.players.updatePlayers(players);
  }
};

/* 升级城镇 */
const upgradeCity = ({
  players,
  villages
}: {
  players: Players;
  villages: Villages;
}) => {
  sound(SoundType.Build).play();
  dispatch.villages.updateVillages(villages);
  dispatch.players.updatePlayers(players);
};

/* 游戏结束 */
const gameOver = ({ winner }: { winner: PlayerId }) => {
  log(`游戏结束，获胜者是${winner}`);
  alert(`游戏结束，获胜者是${winner}`);
};

/* 强盗骰 */
const RobDice = ({ playerId }: { playerId: PlayerId }) => {
  log("强盗出动");
  sound(SoundType.Dice7).play();
  /* 当前回合玩家操作强盗 */
  if (playerId === getPlayerId()) {
    hint.info({
      message: "中央钦定你领导强盗",
      description:
        "摇到了点数7，强盗出动本轮由你领导强盗，请点击地图上资源区块进行掠夺。"
    });
    dispatch.status.pushStatus(Status.RobDice);
    dispatch.status.pushStatus(Status.SelectArea);
  } else {
    hint.info({
      message: "强盗出动！",
      description: `摇到了点数7，中央钦定了他人领导强盗。`
    });
  }
};

/* 黑市交易 */
const dealInBlackMarket = ({
  players,
  playerId,
  gainResource
}: {
  players: Players;
  playerId: PlayerId;
  gainResource: Resource;
}) => {
  const player = getPlayer(playerId, players);
  if (player) {
    log(
      `${player.name}通过黑市交易得到了${formatResourceToText(gainResource)}`
    );
  }
  dispatch.players.updatePlayers(players);
};

export default {
  newRound,
  updateStore,
  buildVillage,
  drawCard,
  upgradeCity,
  gameOver,
  useHarvestCard,
  useArmyCard,
  robResult,
  RobDice,
  robAreaFromDice,
  dealInBlackMarket
};
