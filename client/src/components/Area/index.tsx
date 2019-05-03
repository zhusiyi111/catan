import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import { IArea, AreaLocation, AreaType } from "../../models/area";
import { State } from "../../models";

import "./index.less";
import { Status } from "../../models/status";
import { isEqualLocation } from "../../models/location/helper";
import { StatusData } from "../../models/statusData";
import { message } from "antd";
import { isNeerCastle } from "../../models/area/helper";
import { Villages } from "../../models/village";

import BrickBg from "../../assets/image/brickArea.png";
import WheatBg from "../../assets/image/wheatArea.png";
import WoodBg from "../../assets/image/woodArea2.png";
import OreBg from "../../assets/image/oreArea.jpg";
import SheepBg from "../../assets/image/sheepArea.jpg";
import DesertBg from "../../assets/image/desertArea.png";

const BgMap: { [k: string]: string } = {
  [AreaType.Brick]: BrickBg,
  [AreaType.Wheat]: WheatBg,
  [AreaType.Wood]: WoodBg,
  [AreaType.Sheep]: SheepBg,
  [AreaType.Ore]: OreBg,
  [AreaType.Desert]: DesertBg
};

interface AreaProps {
  area: IArea;
  currentRoll: number;
  villages: Villages;
  status: Status[];
  statusData: StatusData;
  selectRobberArea: (location: AreaLocation & { isRobDice?: boolean }) => void;
}

export const AreaSize = 120;
export const AreaSpaceSize = 10;

class Area extends Component<AreaProps> {
  state = {};

  getOffset = (location: AreaLocation) => {
    const { x, y } = location;
    const left = (AreaSize + AreaSpaceSize) * x;
    const top = (AreaSize + AreaSpaceSize) * y;
    return { left, top };
  };

  canSelect = () => {
    const { status } = this.props;
    if (status.includes(Status.SelectArea)) {
      return true;
    }
    return false;
  };

  clickArea = () => {
    const { status, area, selectRobberArea, villages } = this.props;
    const { location } = area;
    /* 判断当前状态 */
    /* 情况1. 使用士兵卡之后选择area放置强盗 */
    if (
      status.includes(Status.UseArmyCard) &&
      status.includes(Status.SelectArea)
    ) {
      if (isNeerCastle(area, villages)) {
        message.warn("该区域周围有城堡，不能放置强盗");
      } else {
        selectRobberArea(location);
      }
    } else if (
      status.includes(Status.RobDice) &&
      status.includes(Status.SelectArea)
    ) {
      /* 情况2. 强盗骰触发 */
      if (isNeerCastle(area, villages)) {
        message.warn("该区域周围有城堡，不能放置强盗");
      } else {
        selectRobberArea({ ...location, isRobDice: true });
      }
    }
  };

  isSelected = () => {
    const {
      statusData,
      area: { location }
    } = this.props;
    const selectAreaData = statusData[Status.SelectArea];

    let selectedLocation;
    if (selectAreaData) {
      selectedLocation = selectAreaData;
      return isEqualLocation(selectedLocation, location);
    }
    return false;
  };

  render() {
    const { area, currentRoll } = this.props;
    const { type, number, location, hasRobber } = area;
    const offset = this.getOffset(location);

    return (
      <div
        className={classnames("area", type, {
          current: currentRoll === number,
          canSelect: this.canSelect(),
          selected: this.isSelected(),
          hasRobber
        })}
        style={{ width: AreaSize, height: AreaSize, ...offset }}
        onClick={this.clickArea}
      >
        <p
          className={classnames("number", {
            isFreqent: number === 6 || number === 8
          })}
        >
          {number}
        </p>
        <img className="areaBg" alt="bg" src={BgMap[type]} />
      </div>
    );
  }
}

const mapState = ({ roll, status, statusData, villages }: State) => ({
  currentRoll: roll.rollA + roll.rollB,
  villages,
  status,
  statusData
});

const mapDispatch = (dispatch: any) => ({
  selectRobberArea: dispatch.areas.selectRobberArea
});

export default connect(
  mapState,
  mapDispatch
)(Area);
