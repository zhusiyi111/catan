import store from "../index";

import { doubleRoll } from "../roll/helper";
import { Areas, IArea } from "../area";
import { Villages, IVillage, VillageType } from "../village";
import { isEqualLocation } from "../location/helper";
import { Players, PlayerId } from "../player";
import { Resource, ResourceType } from "../resource";
import { endRound } from "./service";
import { Round } from "../round";

const { dispatch } = store;

// function delay(number: number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, number);
//   });
// }

export function startGame() {}

export function endTurn(round: Round) {
  dispatch.status.returnMain();
  endRound(round);
}

export async function start() {
  const { players, areas, villages, currentPlayer } = store.getState();
  changePlayer(players, currentPlayer);

  const rollResult = doubleRoll();
  const rollNumber = rollResult.reduce((acc, v) => acc + v, 0);
  dispatch.roll.showRollResult(rollResult);
  // await delay(1000);
  updateResource(players, rollNumber, areas, villages);
}

function changePlayer(players: Players, currentPlayer: PlayerId) {
  const player = findNextPlayer(players, currentPlayer);
  if (player && player.id) {
    dispatch.currentPlayer.changePlayer(player.id);
  }
}

function findNextPlayer(players: Players, currentPlayer: PlayerId) {
  if (players.length === 0) return undefined;
  const len = players.length;
  const index = players.findIndex(v => v.id === currentPlayer);
  let result;
  if (index === undefined || index + 1 >= len) {
    result = 0;
  } else {
    result = index + 1;
  }
  return players[result];
}

function updateResource(
  players: Players,
  rollNumber: number,
  areas: Areas,
  villages: Villages
) {
  const playersAddMap: { [k: number]: Resource } = {};

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
    switch (villageType) {
      case VillageType.Town:
        playersAddMap[owner][type] += 1;
        break;
      case VillageType.City:
        playersAddMap[owner][type] += 2;
        break;
      default:
        break;
    }
    return null;
  });

  const newPlayers = players.map(player => {
    const { id } = player;
    const addItem = playersAddMap[id];
    if (addItem) {
      player.resource[ResourceType.Brick] += addItem[ResourceType.Brick];
      player.resource[ResourceType.Wheat] += addItem[ResourceType.Wheat];
      player.resource[ResourceType.Wood] += addItem[ResourceType.Wood];
      player.resource[ResourceType.Ore] += addItem[ResourceType.Ore];
      player.resource[ResourceType.Sheep] += addItem[ResourceType.Sheep];
    }
    return player;
  });

  dispatch.players.updatePlayers(newPlayers);
}

function getVillageFromRoll(
  rollNumber: number,
  areas: Areas,
  villages: Villages
) {
  const selectedAreas = areas.filter(v => v.number === rollNumber);
  const selectedItems = getVillagesAroundAreas(selectedAreas, villages);
  return selectedItems;
}

function getVillagesAroundAreas(areas: Areas, villages: Villages) {
  const result = areas.reduce(
    (acc: { village: IVillage; area: IArea }[], area) => {
      return acc.concat(getVillagesAroundArea(area, villages));
    },
    []
  );
  return result;
}

function getVillagesAroundArea(area: IArea, villages: Villages) {
  const { location } = area;
  const { x: areaX, y: areaY } = location;
  const locationList = [
    { x: areaX, y: areaY, area },
    { x: areaX + 1, y: areaY, area },
    { x: areaX, y: areaY + 1, area },
    { x: areaX + 1, y: areaY + 1, area }
  ];
  const result = villages.reduce(
    (acc: { village: IVillage; area: IArea }[], village) => {
      locationList.map(location => {
        if (isEqualLocation(location, village.location)) {
          acc.push({
            village,
            area
          });
        }
        return null;
      });
      return acc;
    },
    []
  );
  return result;
}
