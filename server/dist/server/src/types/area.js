"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
var AreaName;
(function (AreaName) {
    AreaName["Brick"] = "\u7816";
    AreaName["Wood"] = "\u6728";
    AreaName["Sheep"] = "\u7F8A";
    AreaName["Wheat"] = "\u9EA6";
    AreaName["Ore"] = "\u77FF";
    AreaName["Desert"] = "\u6C99\u6F20";
})(AreaName = exports.AreaName || (exports.AreaName = {}));
var AreaExtendType;
(function (AreaExtendType) {
    AreaExtendType["Desert"] = "desert";
})(AreaExtendType = exports.AreaExtendType || (exports.AreaExtendType = {}));
exports.AreaTypeToName = {
    [resource_1.ResourceType.Brick]: AreaName.Brick,
    [resource_1.ResourceType.Wood]: AreaName.Wood,
    [resource_1.ResourceType.Sheep]: AreaName.Sheep,
    [resource_1.ResourceType.Wheat]: AreaName.Wheat,
    [resource_1.ResourceType.Ore]: AreaName.Ore,
    [AreaExtendType.Desert]: AreaName.Desert
};
//# sourceMappingURL=area.js.map