"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = require("./location");
function getVillagesAroundAreas(areas, villages) {
    const result = areas.reduce((acc, area) => {
        return acc.concat(getVillagesAroundArea(area, villages));
    }, []);
    return result;
}
exports.getVillagesAroundAreas = getVillagesAroundAreas;
function getVillagesAroundArea(area, villages) {
    const { location } = area;
    const { x: areaX, y: areaY } = location;
    const locationList = [
        { x: areaX, y: areaY, area },
        { x: areaX + 1, y: areaY, area },
        { x: areaX, y: areaY + 1, area },
        { x: areaX + 1, y: areaY + 1, area }
    ];
    const result = villages.reduce((acc, village) => {
        locationList.map(location => {
            if (location_1.isEqualLocation(location, village.location)) {
                acc.push({
                    village,
                    area
                });
            }
            return null;
        });
        return acc;
    }, []);
    return result;
}
exports.getVillagesAroundArea = getVillagesAroundArea;
//# sourceMappingURL=village.js.map