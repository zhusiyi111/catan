"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const village_1 = require("../types/village");
var ResourceType;
(function (ResourceType) {
    ResourceType["Brick"] = "brick";
    ResourceType["Wood"] = "wood";
    ResourceType["Sheep"] = "sheep";
    ResourceType["Wheat"] = "wheat";
    ResourceType["Ore"] = "ore"; //铁矿
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
exports.BuildingResouceMap = {
    [village_1.VillageType.City]: {
        [ResourceType.Wood]: 0,
        [ResourceType.Brick]: 0,
        [ResourceType.Sheep]: 0,
        [ResourceType.Wheat]: 2,
        [ResourceType.Ore]: 3
    },
    [village_1.VillageType.Warehouse]: {
        [ResourceType.Wood]: 2,
        [ResourceType.Brick]: 2,
        [ResourceType.Sheep]: 0,
        [ResourceType.Wheat]: 0,
        [ResourceType.Ore]: 0
    },
    [village_1.VillageType.Wonder]: {
        [ResourceType.Wood]: 2,
        [ResourceType.Brick]: 2,
        [ResourceType.Sheep]: 2,
        [ResourceType.Wheat]: 1,
        [ResourceType.Ore]: 1
    }
};
//# sourceMappingURL=resource.js.map