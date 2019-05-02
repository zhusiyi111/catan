import { reduce, filter, cloneDeep, sampleSize } from "lodash";
import { Players, PlayerId, Player } from "../types/player";
import { Areas, IArea } from "../types/area";
import { Resource, ResourceType, getEmptyResource } from "../types/resource";
import { Villages, IVillage, VillageType } from "../types/village";
import { getVillagesAroundAreas, calcCastleNum } from "./village";
import { rollBetween } from "./roll";
import { isForbidArea } from "./area";

const ProduceMap: { [i: string]: number } = {
  [VillageType.Town]: 1,
  [VillageType.City]: 2,
  [VillageType.Warehouse]: 1,
  [VillageType.Castle]: 1,
  [VillageType.Wonder]: 0
};

export function updateResource(
  playersSource: Players,
  rollNumber: number,
  areas: Areas,
  villages: Villages
) {
  const playersAddMap: { [k: number]: Resource } = {};
  const players = cloneDeep(playersSource);

  const items = getVillageFromRoll(rollNumber, areas, villages);
  items.map(({ area, village }) => {
    const { type } = area;
    const { owner, type: villageType } = village;
    if (!playersAddMap[owner]) {
      playersAddMap[owner] = {
        [ResourceType.Brick]: 0,
        [ResourceType.Wood]: 0,
        [ResourceType.Sheep]: 0,
        [ResourceType.Wheat]: 0,
        [ResourceType.Ore]: 0
      };
    }
    playersAddMap[owner][type] += ProduceMap[villageType];
    return null;
  });

  console.log(playersAddMap);

  const newPlayers = players.map(player => {
    const { id, resource, volume } = player;
    let addItem = playersAddMap[id];
    if (addItem) {
      const total = calcResourceTotal(resource);
      let left = volume - total;

      /* 如果已经没空位了 */
      if (left <= 0) {
        return player;
      } else {
        /* 溢出个数 */
        const overflow = calcResourceTotal(addItem) - left;

        if (overflow > 0) {
          /* 空位放不下所有的新增项，要丢弃一些，直到可以放得下 */
          calcReduceResource(addItem, left);
        }

        addResource(player.resource, addItem);
      }
    }
    return player;
  });
  return newPlayers;
}

function getVillageFromRoll(
  rollNumber: number,
  areas: Areas,
  villages: Villages
) {
  const selectedAreas = areas.filter(
    v =>
      v.number === rollNumber &&
      !isRobberAera(v) &&
      !isForbidArea(v.location.x, v.location.y)
  );
  const selectedItems = getVillagesAroundAreas(selectedAreas, villages);
  return selectedItems;
}

/* 判断是否有robber */
function isRobberAera(area: IArea) {
  return area.hasRobber === true;
}

/* 计算资源总和 */
function calcResourceTotal(resourceItems: Resource) {
  return reduce(
    resourceItems,
    (acc, v) => {
      return acc + v;
    },
    0
  );
}

/* 丢弃资源直到save个数 */
function dropResource(resource: Resource, save: number) {
  let newResource: Resource = {
    [ResourceType.Brick]: 0,
    [ResourceType.Wood]: 0,
    [ResourceType.Sheep]: 0,
    [ResourceType.Wheat]: 0,
    [ResourceType.Ore]: 0
  };
  let left = save;
  newResource = reduce(
    resource,
    (acc, v, i) => {
      if (v === 0 || left <= 0) return acc;

      /* 如果还足以全部push */
      if (left > v) {
        acc[i] += v;
        left -= v;
      } else {
        acc[i] += left;
        left = 0;
      }

      return acc;
    },
    newResource
  );
  return newResource;
}

/* 根据两方玩家的情况，计算要抢多少资源 */
export function calcRobTotal(
  robPlayer: Player,
  robbedPlayer: Player,
  villages: Villages
) {
  const robCastleNum = calcCastleNum(robPlayer, villages);
  const robbedCastleNum = calcCastleNum(robbedPlayer, villages);
  const BaseRobNum = 1;
  let overflow = robCastleNum - robbedCastleNum;
  overflow = overflow <= 0 ? 0 : rollBetween(0, overflow);
  const num = BaseRobNum + overflow;
  return num;
}

/* 根据被抢者的实际情况，计算要被抢的实际资源 */
export function calcActualRobResource(robbedPlayer: Player, total: number) {
  const resource = cloneDeep(robbedPlayer.resource);
  const robbedResourceTotal = calcResourceTotal(resource);
  /* 如果被抢者的所有资源都不够或者刚好相等，那就全部抢走 */
  if (total >= robbedResourceTotal) {
    return resource;
  }
  return calcReduceResource(resource, total);
}

/* 计算资源减少表 ,total:保留的个数 */
export function calcReduceResource(resource: Resource, total: number) {
  const resouceList: ResourceType[] = reduce(
    resource,
    (acc, v, type) => {
      for (let i = 0; i < v; i++) {
        acc.push(type);
      }
      return acc;
    },
    []
  );
  const randomList = sampleSize(resouceList, total);

  let result: Resource = {
    [ResourceType.Brick]: 0,
    [ResourceType.Wood]: 0,
    [ResourceType.Sheep]: 0,
    [ResourceType.Wheat]: 0,
    [ResourceType.Ore]: 0
  };
  randomList.map(type => {
    result[type] += 1;
  });

  return result;
}

/* 根据资源变动表减少resource */
export function reduceResource(resource: Resource, modifyResource: Resource) {
  for (let i in resource) {
    resource[i] = resource[i] - (modifyResource[i] || 0);
  }
}

/* 根据资源变动表增加resource */
export function addResource(resource: Resource, modifyResource: Resource) {
  for (let i in resource) {
    resource[i] = resource[i] + (modifyResource[i] || 0);
  }
}
