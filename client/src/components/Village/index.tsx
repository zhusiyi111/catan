import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { IVillage, VillageLocation, VillageType } from "../../models/village";

import "./index.less";

import { AreaSize, AreaSpaceSize } from "../../components/Area";
import { State } from "../../models";
import { Status } from "../../models/status";
import { getPlayerId, getPlayer } from "../../models/player/helper";
import { PlayerId, Players } from "../../models/player";
import { StatusData } from "../../models/statusData";
import { isEqualLocation } from "../../models/location/helper";
import Icons, { IconName } from "../Icons";

const VillageSize = 40;

const IconMap: { [k: string]: string } = {
  [VillageType.Town]: IconName.Town,
  [VillageType.City]: IconName.City,
  [VillageType.Castle]: IconName.Castle,
  [VillageType.Warehouse]: IconName.Warehouse,
  [VillageType.Wonder]: IconName.Wonder
};

interface VillageProps {
  village: IVillage;
  status: Status[];
  statusData: StatusData;
  players: Players;
  clickVillage: () => void;
  upgradeVillage: ({
    location,
    type
  }: {
    location: VillageLocation;
    type: VillageType;
  }) => void;
  robVillage: (location: VillageLocation) => void;
}

class Village extends Component<VillageProps> {
  getOffset = () => {
    const { location } = this.props.village;
    const { x, y } = location;
    const left = AreaSize * x + AreaSpaceSize * (x > 0 ? x - 0.5 : 0);
    const top = AreaSize * y + AreaSpaceSize * (y > 0 ? y - 0.5 : 0);
    return { left, top };
  };

  /* 需要模糊本village的情况 */
  shouldBlurred = (playerId: PlayerId) => {
    // 1.升级二级城，在选自己的Town
    const { status, village, statusData } = this.props;
    const { location } = village;
    if (
      status.includes(Status.SelectMyTown) &&
      (village.owner !== playerId || village.type !== VillageType.Town)
    ) {
      return true;
    } else if (
      status.includes(Status.SelectTargetVillage) &&
      status.includes(Status.RobVillage)
    ) {
      /* 2. 正在抢劫别人的village */
      const locations = statusData[Status.SelectTargetVillage];
      if (locations && locations.length) {
        /* 模糊所有非待选的village */
        return locations.every(v => !isEqualLocation(v, location));
      }
    }

    return false;
  };

  /* 需要高亮的情况 */
  shouldHighlight = (playerId: PlayerId) => {
    const { status, village, statusData } = this.props;
    const { location } = village;
    /* 1. 升级2级城，且是自己的Town */
    if (
      status.includes(Status.SelectMyTown) &&
      village.owner === playerId &&
      village.type === VillageType.Town
    ) {
      return true;
    } else if (
      status.includes(Status.SelectTargetVillage) &&
      status.includes(Status.RobVillage)
    ) {
      /* 2. 正在抢劫别人的village */
      const locations = statusData[Status.SelectTargetVillage];
      if (locations && locations.length) {
        /* 高亮所有待选的village */
        return locations.some(v => isEqualLocation(v, location));
      }
    }

    return false;
  };

  /* Village被点击 */
  onClickVillage = () => {
    const { status, village } = this.props;
    const { location } = village;

    /* 情况1:正在升级城市 */
    if (status.includes(Status.UpgradeCity)) {
      this.props.upgradeVillage({ location, type: VillageType.City });
    } else if (status.includes(Status.UpgradeWarehouse)) {
      /* 情况2: 正在升级仓库 */
      this.props.upgradeVillage({ location, type: VillageType.Warehouse });
    } else if (status.includes(Status.UpgradeCastle)) {
      /* 情况3: 正在升级城堡 */
      this.props.upgradeVillage({ location, type: VillageType.Castle });
    } else if (status.includes(Status.UpgradeWonder)) {
      /* 情况4: 正在升级奇观 */
      this.props.upgradeVillage({ location, type: VillageType.Wonder });
    } else if (status.includes(Status.SelectTargetVillage)) {
      /* 正在选择特定village */

      /* 情况5: 正在抢劫village */
      if (status.includes(Status.RobVillage)) {
        this.props.robVillage(location);
      }
    }
  };

  render() {
    const playerId = getPlayerId();
    const { village, players } = this.props;

    const isBlurred = this.shouldBlurred(playerId);
    const isHighlight = this.shouldHighlight(playerId);

    const owner = getPlayer(village.owner, players);
    return (
      <div
        className={classnames("village", village.type, {
          blurred: isBlurred,
          highlight: isHighlight
        })}
        onClick={this.onClickVillage}
        style={{
          width: VillageSize,
          height: VillageSize,
          ...this.getOffset()
        }}
      >
        {(
          <Icons
            type={IconMap[village.type]}
            backgroundColor="#fff"
            color={owner ? owner.color : "black"}
            fontSize={`${VillageSize}px`}
          />
        ) || village.owner}
      </div>
    );
  }
}

const mapState = (s: State) => ({
  status: s.status,
  statusData: s.statusData,
  players: s.players
});

const mapDispatch = (dispatch: any) => ({
  clickVillage: dispatch.status.clickVillage,
  upgradeVillage: dispatch.villages.upgradeVillage,
  robVillage: dispatch.villages.robVillage
});

export default connect(
  mapState,
  mapDispatch
)(Village);
