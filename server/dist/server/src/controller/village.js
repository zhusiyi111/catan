"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const flow_1 = require("../dao/flow");
const resource_1 = require("../types/resource");
const village_1 = require("../types/village");
const village_2 = require("../dao/village");
const player_1 = require("./player");
const location_1 = require("../service/location");
const volume_1 = require("../types/volume");
function findVillage(location, villages) {
    return villages.find(v => location_1.isEqualLocation(v.location, location));
}
function canBuildVillage(player) {
    const { resource } = player;
    return (resource[resource_1.ResourceType.Brick] >= 1 &&
        resource[resource_1.ResourceType.Wood] >= 1 &&
        resource[resource_1.ResourceType.Sheep] >= 1 &&
        resource[resource_1.ResourceType.Wheat] >= 1);
}
/* 建村庄扣除资源 */
function useResourceBuildVillage(player) {
    player.resource[resource_1.ResourceType.Brick] -= 1;
    player.resource[resource_1.ResourceType.Wood] -= 1;
    player.resource[resource_1.ResourceType.Sheep] -= 1;
    player.resource[resource_1.ResourceType.Wheat] -= 1;
}
/* 升级二级城资源条件 */
function canResourceUpgradeVillage(type, resource) {
    const need = resource_1.BuildingResouceMap[type];
    return lodash_1.every(resource, (v, i) => {
        return v >= need[i];
    });
}
exports.canResourceUpgradeVillage = canResourceUpgradeVillage;
/* 升级二级城扣除资源 */
function useResourceUpgradeVillage(type, resource) {
    const need = resource_1.BuildingResouceMap[type];
    lodash_1.forEach(resource, (v, i) => {
        resource[i] = v - need[i];
    });
}
exports.useResourceUpgradeVillage = useResourceUpgradeVillage;
/* 改容量 */
function changeVolume(player, num) {
    const cur = player.volume;
    player.volume = cur + num;
}
exports.changeVolume = changeVolume;
class UserController {
    static async buildVillage(ctx) {
        // 取matchId,round,x,y,owner,type
        let { matchId } = ctx.query;
        matchId = +matchId;
        let { x, y, playerId } = ctx.request.body;
        // 取对应player,判断新建条件(可以前端做)
        const store = await flow_1.getInGameStore(matchId);
        const { players, currentPlayer, villages } = store;
        const player = player_1.getPlayer(playerId, players);
        const canBuild = canBuildVillage(player);
        if (!canBuild) {
            ctx.body = "不够资源建城";
            return;
        }
        // 新建village对象
        const newVillage = {
            location: {
                x,
                y
            },
            owner: playerId,
            type: village_1.VillageType.Town
        };
        villages.push(newVillage);
        // 扣资源
        useResourceBuildVillage(player);
        // 存
        await flow_1.updateInGameStore(store);
        // 广播新建消息
        village_2.broadcastBuildVillage({ players: store.players, villages: store.villages });
        ctx.body = "ok";
    }
    // static async upgradeCity(ctx: BaseContext) {
    //   let { matchId } = ctx.query;
    //   matchId = +matchId;
    //   let { x, y, playerId } = ctx.request.body;
    //   const store = await getInGameStore(matchId);
    //   const { villages, players } = store;
    //   const player = getPlayer(playerId, players);
    //   const { resource } = player;
    //   // 判断建City条件
    //   if (!canResourceUpgradeCity(resource)) {
    //     ctx.body = "资源不够";
    //     return;
    //   }
    //   // TODO 这里还要校验town的类型等，先不做
    //   // 扣资源
    //   useResourceUpgradeCity(player);
    //   // 升级城镇
    //   const village = findVillage({ x, y }, villages);
    //   village.type = VillageType.City;
    //   // 存
    //   await updateInGameStore(store);
    //   // 广播
    //   broadcaseUpgradeCity({
    //     villages: store.villages,
    //     players: store.players
    //   });
    //   ctx.body = "ok";
    // }
    static async upgradeVillage(ctx) {
        let { matchId } = ctx.query;
        matchId = +matchId;
        let { x, y, playerId, type } = ctx.request.body;
        const store = await flow_1.getInGameStore(matchId);
        const { villages, players } = store;
        const player = player_1.getPlayer(playerId, players);
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
        if (type === village_1.VillageType.Warehouse) {
            changeVolume(player, volume_1.VolumeOfWarehouse);
        }
        // 升级城镇
        const village = findVillage({ x, y }, villages);
        village.type = type;
        // 存
        await flow_1.updateInGameStore(store);
        // 广播
        village_2.broadcaseUpgradeCity({
            villages: store.villages,
            players: store.players
        });
        ctx.body = "ok";
    }
}
exports.default = UserController;
//# sourceMappingURL=village.js.map