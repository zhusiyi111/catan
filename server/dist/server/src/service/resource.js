"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const resource_1 = require("../types/resource");
const village_1 = require("../types/village");
const village_2 = require("./village");
const ProduceMap = {
    [village_1.VillageType.Town]: 1,
    [village_1.VillageType.City]: 2,
    [village_1.VillageType.Warehouse]: 1,
    [village_1.VillageType.Wonder]: 0
};
function updateResource(players, rollNumber, areas, villages) {
    const playersAddMap = {};
    const items = getVillageFromRoll(rollNumber, areas, villages);
    items.map(({ area, village }) => {
        const { type } = area;
        const { owner, type: villageType } = village;
        if (!playersAddMap[owner]) {
            playersAddMap[owner] = {
                [resource_1.ResourceType.Brick]: 0,
                [resource_1.ResourceType.Wood]: 0,
                [resource_1.ResourceType.Sheep]: 0,
                [resource_1.ResourceType.Wheat]: 0,
                [resource_1.ResourceType.Ore]: 0
            };
        }
        playersAddMap[owner][type] += ProduceMap[villageType];
        return null;
    });
    const newPlayers = players.map(player => {
        const { id, resource, volume } = player;
        let addItem = playersAddMap[id];
        if (addItem) {
            const total = calcResourceTotal(resource);
            let left = volume - total;
            /* 如果已经没空位了 */
            if (left <= 0) {
                return player;
            }
            else {
                /* 溢出个数 */
                const overflow = calcResourceTotal(addItem) - left;
                if (overflow > 0) {
                    /* 空位放不下所有的新增项，要丢弃一些，直到可以放得下 */
                    addItem = dropResource(addItem, overflow);
                }
                player.resource[resource_1.ResourceType.Brick] += addItem[resource_1.ResourceType.Brick];
                player.resource[resource_1.ResourceType.Wheat] += addItem[resource_1.ResourceType.Wheat];
                player.resource[resource_1.ResourceType.Wood] += addItem[resource_1.ResourceType.Wood];
                player.resource[resource_1.ResourceType.Ore] += addItem[resource_1.ResourceType.Ore];
                player.resource[resource_1.ResourceType.Sheep] += addItem[resource_1.ResourceType.Sheep];
            }
        }
        return player;
    });
    return newPlayers;
}
exports.updateResource = updateResource;
function getVillageFromRoll(rollNumber, areas, villages) {
    const selectedAreas = areas.filter(v => v.number === rollNumber && !isRobberAera(v));
    const selectedItems = village_2.getVillagesAroundAreas(selectedAreas, villages);
    return selectedItems;
}
/* 判断是否有robber */
function isRobberAera(area) {
    return area.hasRobber === true;
}
/* 计算资源总和 */
function calcResourceTotal(resourceItems) {
    return lodash_1.reduce(resourceItems, (acc, v) => {
        return acc + v;
    }, 0);
}
/* 丢弃资源直到save个数 */
function dropResource(resource, save) {
    let newResource = {
        [resource_1.ResourceType.Brick]: 0,
        [resource_1.ResourceType.Wood]: 0,
        [resource_1.ResourceType.Sheep]: 0,
        [resource_1.ResourceType.Wheat]: 0,
        [resource_1.ResourceType.Ore]: 0
    };
    let left = save;
    newResource = lodash_1.reduce(resource, (acc, v, i) => {
        if (v === 0 || left <= 0)
            return acc;
        /* 如果还足以全部push */
        if (left > v) {
            acc[i] += v;
            left -= v;
        }
        else {
            acc[i] += left;
            left = 0;
        }
        return acc;
    }, newResource);
    return newResource;
}
//# sourceMappingURL=resource.js.map