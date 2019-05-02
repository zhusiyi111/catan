"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = require("./location");
function getAreaFromLocation(location, areas) {
    return areas.find(v => location_1.isEqualLocation(location, v.location));
}
exports.getAreaFromLocation = getAreaFromLocation;
function removeRobberInAllAreas(areas) {
    areas.map(v => {
        v.hasRobber = false;
    });
}
exports.removeRobberInAllAreas = removeRobberInAllAreas;
//# sourceMappingURL=area.js.map