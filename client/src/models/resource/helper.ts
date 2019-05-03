import { every } from "lodash";
import { Resource, BuildingResouceMap, ResourceName } from ".";
import { reduce } from "lodash";
import { VillageType } from "../village";

/* 建村庄资源条件 */
export function canBuildVillage(resource: Resource) {
  return canResourceUpgradeVillage(VillageType.Town, resource);
}

/* 判断是否可以升级某类二级城 */
export function canResourceUpgradeVillage(
  type: VillageType,
  resource: Resource
) {
  const need = BuildingResouceMap[type];
  return every(resource, (v, i) => {
    return v >= need[i];
  });
}

/* 计算资源综合 */
export function getResourceTotal(resource: Resource) {
  return reduce(
    resource,
    (acc, v) => {
      return (acc += v);
    },
    0
  );
}

/* 将资源表转为文本 */
export function formatResourceToText(resource: Resource) {
  let arr = [];

  for (let i in resource) {
    const v = resource[i];
    if (v > 0) {
      arr.push(v + ResourceName[i]);
    }
  }

  return arr.join(",");
}
