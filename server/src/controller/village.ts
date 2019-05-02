import { BaseContext } from "koa";
import { every, forEach } from "lodash";
import { getInGameStore, updateInGameStore } from "../dao/flow";
import { Player, Players } from "../types/player";
import { ResourceType, Resource, BuildingResouceMap } from "../types/resource";
import {
  IVillage,
  VillageType,
  VillageLocation,
  Villages
} from "../types/village";
import { broadcastBuildVillage, broadcaseUpgradeCity } from "../dao/village";
import { getPlayer } from "./player";
import { isEqualLocation } from "../service/location";
import { VolumeOfWarehouse } from "../types/volume";
import { getVillageFromLocation } from "../service/village";
import { calcRobTotal, reduceResource, addResource } from "../service/resource";
import { calcActualRobResource } from "../service/resource";
import { broadcaseRobResult } from "../dao/player";

function findVillage(location: VillageLocation, villages: Villages) {
  return villages.find(v => isEqualLocation(v.location, location));
}

function canBuildVillage(player: Player) {
  const { resource } = player;
  return (
    resource[ResourceType.Brick] >= 1 &&
    resource[ResourceType.Wood] >= 1 &&
    resource[ResourceType.Sheep] >= 1 &&
    resource[ResourceType.Wheat] >= 1
  );
}
/* 建村庄扣除资源 */
function useResourceBuildVillage(player: Player) {
  player.resource[ResourceType.Brick] -= 1;
  player.resource[ResourceType.Wood] -= 1;
  player.resource[ResourceType.Sheep] -= 1;
  player.resource[ResourceType.Wheat] -= 1;
}

/* 升级二级城资源条件 */
export function canResourceUpgradeVillage(
  type: VillageType,
  resource: Resource
) {
  const need = BuildingResouceMap[type];
  return every(resource, (v, i) => {
    return v >= need[i];
  });
}

/* 升级二级城扣除资源 */
export function useResourceUpgradeVillage(
  type: VillageType,
  resource: Resource
) {
  const need = BuildingResouceMap[type];
  forEach(resource, (v, i) => {
    resource[i] = v - need[i];
  });
}

/* 改容量 */
export function changeVolume(player: Player, num: number) {
  const cur = player.volume;
  player.volume = cur + num;
}

export default class UserController {
  public static async buildVillage(ctx: BaseContext) {
    // 取matchId,round,x,y,owner,type
    let { matchId } = ctx.query;
    matchId = +matchId;
    let { x, y, playerId } = ctx.request.body;

    // 取对应player,判断新建条件(可以前端做)
    const store = await getInGameStore(matchId);
    const { players, currentPlayer, villages } = store;
    const player = getPlayer(playerId, players);

    const canBuild = canBuildVillage(player);
    if (!canBuild) {
      ctx.body = "不够资源建城";
      return;
    }

    // 新建village对象
    const newVillage: IVillage = {
      location: {
        x,
        y
      },
      owner: playerId,
      type: VillageType.Town
    };
    villages.push(newVillage);

    // 扣资源
    useResourceBuildVillage(player);

    // 存
    await updateInGameStore(store);

    // 广播新建消息
    broadcastBuildVillage({ players: store.players, villages: store.villages });

    ctx.body = "ok";
  }

  static async upgradeVillage(ctx: BaseContext) {
    let { matchId } = ctx.query;
    matchId = +matchId;
    let { x, y, playerId, type } = ctx.request.body;

    const store = await getInGameStore(matchId);
    const { villages, players } = store;

    const player = getPlayer(playerId, players);

    const { resource } = player;

    // 判断升级对应二级城的条件
    if (!canResourceUpgradeVillage(type, resource)) {
      ctx.body = "资源不够";
      return;
    }
    // TODO 这里还要校验town的类型等，先不做

    // 扣资源
    useResourceUpgradeVillage(type, resource);

    // 如果升级成仓库，需要加一下容量
    if (type === VillageType.Warehouse) {
      changeVolume(player, VolumeOfWarehouse);
    }

    // 升级城镇
    const village = findVillage({ x, y }, villages);
    village.type = type;

    // 存
    await updateInGameStore(store);

    // 广播
    broadcaseUpgradeCity({
      villages: store.villages,
      players: store.players
    });

    ctx.body = "ok";
  }

  static async robVillage(ctx: BaseContext) {
    let { matchId, playerId } = ctx.query;
    matchId = +matchId;
    playerId = +playerId;
    let { x, y } = ctx.request.body;

    const store = await getInGameStore(matchId);
    const { villages, players } = store;

    const robPlayer = getPlayer(playerId, players);

    const targetVillage = getVillageFromLocation({ x, y }, villages);
    const robbedPlayer = getPlayer(targetVillage.owner, players);

    // 计算理论上要抢多少资源
    const robTotal = calcRobTotal(robPlayer, robbedPlayer, villages);

    // 根据被抢者的实际情况，调整被抢的资源
    const actualRobResource = calcActualRobResource(robPlayer, robTotal);

    // 减少被抢者的资源
    reduceResource(robbedPlayer.resource, actualRobResource);

    // 增加抢夺者的资源
    addResource(robPlayer.resource, actualRobResource);

    // 存
    await updateInGameStore(store);

    // 广播
    broadcaseRobResult({
      players: store.players,
      robPlayerId: robPlayer.id,
      village: targetVillage,
      resource: actualRobResource
    });

    ctx.body = "ok";
  }
}
