import { Location } from "../location";

import { Status } from "../status";
import { selectRobberArea } from "./service";
import { message } from "antd";

export enum AreaName {
  Brick = "Brick",
  Wood = "Wood",
  Sheep = "Sheep",
  Wheat = "Wheat",
  Ore = "Ore"
}

// 区域类型
export enum AreaType {
  Brick = "brick",
  Wood = "wood",
  Sheep = "sheep",
  Ore = "ore",
  Wheat = "wheat",
  Desert = "desert"
}

export interface AreaLocation extends Location {}

export interface IArea {
  type: AreaType; // 地区类型
  number: number; //
  name: AreaName;
  location: Location; //位置
  hasRobber: boolean; // 是否有强盗
}

export type Areas = IArea[];

const initialState: Areas = [
  {
    type: AreaType.Brick,
    number: 2,
    name: AreaName.Brick,
    location: {
      x: 0,
      y: 0
    },
    hasRobber: false
  },
  {
    type: AreaType.Wood,
    number: 4,
    name: AreaName.Wood,
    location: {
      x: 1,
      y: 0
    },
    hasRobber: false
  },
  {
    type: AreaType.Sheep,
    number: 6,
    name: AreaName.Sheep,
    location: {
      x: 2,
      y: 0
    },
    hasRobber: false
  },
  {
    type: AreaType.Wood,
    number: 10,
    name: AreaName.Wood,
    location: {
      x: 3,
      y: 0
    },
    hasRobber: false
  },
  {
    type: AreaType.Wood,
    number: 12,
    name: AreaName.Wood,
    location: {
      x: 0,
      y: 1
    },
    hasRobber: false
  },
  {
    type: AreaType.Brick,
    number: 4,
    name: AreaName.Brick,
    location: {
      x: 1,
      y: 1
    },
    hasRobber: false
  },
  {
    type: AreaType.Ore,
    number: 7,
    name: AreaName.Ore,
    location: {
      x: 2,
      y: 1
    },
    hasRobber: false
  },
  {
    type: AreaType.Wheat,
    number: 9,
    name: AreaName.Wheat,
    location: {
      x: 3,
      y: 1
    },
    hasRobber: false
  },
  {
    type: AreaType.Brick,
    number: 11,
    name: AreaName.Brick,
    location: {
      x: 0,
      y: 2
    },
    hasRobber: false
  },
  {
    type: AreaType.Wood,
    number: 8,
    name: AreaName.Wood,
    location: {
      x: 1,
      y: 2
    },
    hasRobber: false
  },
  {
    type: AreaType.Sheep,
    number: 6,
    name: AreaName.Sheep,
    location: {
      x: 2,
      y: 2
    },
    hasRobber: false
  },
  {
    type: AreaType.Ore,
    number: 10,
    name: AreaName.Ore,
    location: {
      x: 3,
      y: 2
    },
    hasRobber: false
  }
];

export default {
  state: initialState,
  reducers: {
    updateAreas(s: Areas, p: Areas) {
      return p;
    }
  },
  effects: (dispatch: any) => ({
    async selectRobberArea(location: AreaLocation & { isRobDice?: boolean }) {
      dispatch.status.removeStatus(Status.SelectArea);
      const res = await selectRobberArea(location);
      if (res.success) {
        const {
          data: { robVillages }
        } = res;
        dispatch.status.returnMain();
        if (!robVillages || robVillages.length === 0) {
          message.warn("周围没有可以掠夺的目标，跳过掠夺行动");
          return;
        }
        dispatch.status.pushStatus(Status.RobVillage);
        dispatch.status.pushStatus(Status.SelectTargetVillage);
        // TODO 提示抢village
        dispatch.statusData.updateStatusData({
          status: Status.SelectTargetVillage,
          payload: robVillages
        });
      }
    }
  })
};
