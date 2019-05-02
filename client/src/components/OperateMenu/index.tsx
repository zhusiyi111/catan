import React, { Component } from "react";
import { connect } from "react-redux";
import classnmes from "classnames";

import { Status } from "../../models/status";
import { isStatus } from "../../models/status/helper";
import { endTurn } from "../../models/flow";

import "./index.less";
import { Players, PlayerId } from "../../models/player";
import {
  canBuildVillage,
  canResourceUpgradeVillage
} from "../../models/resource/helper";
import { State } from "../../models";
import { getPlayerId, getPlayer } from "../../models/player/helper";
import { Round } from "../../models/round";
import { canDarwCard } from "../../models/card/helper";
import { hasTown } from "../../models/village/helper";
import { Villages, VillageType } from "../../models/village";
import { Button, Icon } from "antd";

interface OperateMenuProps {
  status: Status[];
  players: Players;
  round: Round;
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
    endTurn(this.props.round);
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
        </div>

        <div className="row">
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
          <Button
            type="primary"
            className="operateBtn"
            disabled={
              !canResourceUpgradeVillage(VillageType.Wonder, resource) ||
              !hasTown(villages, me.id)
            }
            onClick={this.clickUpgradeWonder}
          >
            升级遗迹
          </Button>
          <Button disabled type="primary" className="operateBtn">
            升级船坞(开发中)
          </Button>
        </div>
        <div className="row">
          <Button
            type="primary"
            className="operateBtn"
            disabled={!canDarwCard(resource)}
            onClick={this.clickCard}
          >
            抽牌
          </Button>
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
  round: s.round,
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
