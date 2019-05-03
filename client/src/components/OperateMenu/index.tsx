import React, { Component } from "react";
import { connect } from "react-redux";
import classnmes from "classnames";

import { Status } from "../../models/status";
import { isStatus } from "../../models/status/helper";
import { endTurn } from "../../models/flow";
import DealPanel from "../DealPanel";
import "./index.less";
import { Players, PlayerId } from "../../models/player";
import {
  canBuildVillage,
  canResourceUpgradeVillage,
  formatResourceToText
} from "../../models/resource/helper";
import { State } from "../../models";
import { getPlayerId, getPlayer } from "../../models/player/helper";
import { canDarwCard } from "../../models/card/helper";
import { hasTown } from "../../models/village/helper";
import { Villages, VillageType, BuildScoreMap } from "../../models/village";
import { VolumeOfWarehouse } from "../../const.json";
import { Button, Icon, Popover } from "antd";
import {
  BuildingResouceMap,
  ProduceMap,
  CardResource
} from "../../models/resource";

interface OperateMenuProps {
  status: Status[];
  players: Players;
  villages: Villages;
  currentPlayer: PlayerId;
  clickBuildVillage: () => void;
  clickUpgradeCity: () => void;
  clickUpgradeWarehouse: () => void;
  clickUpgradeCastle: () => void;
  clickUpgradeWonder: () => void;
  clickCancel: () => void;
  drawCard: () => void;
}

class OperateMenu extends Component<OperateMenuProps> {
  clickBuildVillage = () => {
    this.props.clickBuildVillage();
  };

  clickUpgradeCity = () => {
    this.props.clickUpgradeCity();
  };

  clickUpgradeWarehouse = () => {
    this.props.clickUpgradeWarehouse();
  };

  clickUpgradeCastle = () => {
    this.props.clickUpgradeCastle();
  };

  clickUpgradeWonder = () => {
    this.props.clickUpgradeWonder();
  };

  clickCard = () => {
    this.props.drawCard();
  };

  clickCancel = () => {
    this.props.clickCancel();
  };

  clickEndTurn = () => {
    endTurn();
  };

  render() {
    const { status, players, currentPlayer, villages } = this.props;
    const me = getPlayer(getPlayerId(), players);
    if (!me) {
      return null;
    }
    const isMyRound = me.id === currentPlayer;

    const { resource } = me;

    return (
      <div className={classnmes("operateMenu", { disabled: !isMyRound })}>
        <div className="row">
          <DealPanel />
        </div>
        <div className="row">
          <Popover
            content={
              <>
                <p>
                  村庄，最基本的建筑单位，单位产量：
                  {ProduceMap[VillageType.Town]}
                </p>
                <p>
                  建造需要：
                  {formatResourceToText(BuildingResouceMap[VillageType.Town])}
                </p>
                <p>每个贡献分数：{BuildScoreMap[VillageType.City]}</p>
              </>
            }
            title="村庄"
            mouseEnterDelay={1}
          >
            <Button
              type="primary"
              className="operateBtn"
              disabled={
                !isStatus(status, Status.Main) || !canBuildVillage(resource)
              }
              onClick={this.clickBuildVillage}
            >
              新建村庄
            </Button>
          </Popover>
        </div>

        <div className="row">
          <Popover
            content={
              <>
                <p>城市，单位产量：{ProduceMap[VillageType.City]}</p>
                <p>
                  建造需要：
                  {formatResourceToText(BuildingResouceMap[VillageType.City])}
                </p>
                <p>每个单位贡献分数：{BuildScoreMap[VillageType.City]}</p>
              </>
            }
            title="村庄"
            mouseEnterDelay={1}
          >
            <Button
              type="primary"
              className="operateBtn"
              disabled={
                !canResourceUpgradeVillage(VillageType.City, resource) ||
                !hasTown(villages, me.id)
              }
              onClick={this.clickUpgradeCity}
            >
              升级城市
            </Button>
          </Popover>

          <Popover
            content={
              <>
                <p>仓库，单位产量：{ProduceMap[VillageType.Warehouse]}</p>
                <p>功能：每个仓库额外增加{VolumeOfWarehouse}个容量</p>
                <p>
                  建造需要：
                  {formatResourceToText(BuildingResouceMap[VillageType.Warehouse])}
                </p>
                <p>每个单位贡献分数：{BuildScoreMap[VillageType.Warehouse]}</p>
              </>
            }
            title="仓库"
            mouseEnterDelay={1}
          >
            <Button
              type="primary"
              className="operateBtn"
              disabled={
                !canResourceUpgradeVillage(VillageType.Warehouse, resource) ||
                !hasTown(villages, me.id)
              }
              onClick={this.clickUpgradeWarehouse}
            >
              升级仓库
            </Button>
          </Popover>
          <Popover
            content={
              <>
                <p>城堡，单位产量：{ProduceMap[VillageType.Castle]}</p>
                <p>
                  功能：1. 城堡附近的区域不能被强盗占领。2.
                  掠夺他人的资源数正比于双方城堡的差距
                </p>
                <p>
                  建造需要：
                  {formatResourceToText(BuildingResouceMap[VillageType.Castle])}
                </p>
                <p>每个单位贡献分数：{BuildScoreMap[VillageType.Castle]}</p>
              </>
            }
            title="城堡"
            mouseEnterDelay={1}
          >
            <Button
              type="primary"
              className="operateBtn"
              disabled={
                !canResourceUpgradeVillage(VillageType.Castle, resource) ||
                !hasTown(villages, me.id)
              }
              onClick={this.clickUpgradeCastle}
            >
              升级城堡
            </Button>
          </Popover>
          <Popover
            content={
              <>
                <p>奇观，单位产量：{ProduceMap[VillageType.Wonder]}</p>
                <p>
                  建造需要：
                  {formatResourceToText(BuildingResouceMap[VillageType.Wonder])}
                </p>
                <p>每个单位贡献分数：{BuildScoreMap[VillageType.Wonder]}</p>
              </>
            }
            title="奇观"
            mouseEnterDelay={1}
          >
            <Button
              type="primary"
              className="operateBtn"
              disabled={
                !canResourceUpgradeVillage(VillageType.Wonder, resource) ||
                !hasTown(villages, me.id)
              }
              onClick={this.clickUpgradeWonder}
            >
              升级奇观
            </Button>
          </Popover>
          <Button disabled type="primary" className="operateBtn">
            升级船坞(开发中)
          </Button>
        </div>
        <div className="row">
          <Popover
            content={
              <>
                <p>抽一张发展卡</p>
                <p>
                  需要资源：
                  {formatResourceToText(CardResource)}
                </p>
              </>
            }
            title="奇观"
            mouseEnterDelay={1}
          >
            <Button
              type="primary"
              className="operateBtn"
              disabled={!canDarwCard(resource)}
              onClick={this.clickCard}
            >
              抽牌
            </Button>
          </Popover>
          <Button onClick={this.clickCancel}>取消</Button>
        </div>

        <Button className="endRound" type="primary" onClick={this.clickEndTurn}>
          结束回合
          <Icon type="right-circle" theme="filled" />
        </Button>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  status: s.status,
  players: s.players,
  villages: s.villages,
  currentPlayer: s.currentPlayer
});

const mapDispatch = (dispatch: any) => ({
  clickBuildVillage: dispatch.status.clickBuildVillage,
  clickUpgradeCity: dispatch.status.clickUpgradeCity,
  clickUpgradeWarehouse: dispatch.status.clickUpgradeWarehouse,
  clickUpgradeCastle: dispatch.status.clickUpgradeCastle,
  clickUpgradeWonder: dispatch.status.clickUpgradeWonder,
  clickCancel: dispatch.status.returnMain,
  drawCard: dispatch.players.drawCard
});

export default connect(
  mapState,
  mapDispatch
)(OperateMenu);
