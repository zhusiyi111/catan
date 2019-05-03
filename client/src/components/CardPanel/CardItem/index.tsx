import React, { Component } from "react";
import { Popover } from "antd";
import { Card, CardType } from "../../../models/card";
import ArmyCard from "./ArmyCard";

import "./index.less";
import HarvestCard from "./HarvestCard";
import ScoreCard from "./ScoreCard";

interface CardItemProps {
  card: Card;
}

interface CardItemState {
  popoverVisible: boolean;
}

class CardItem extends Component<CardItemProps, CardItemState> {
  state = {
    popoverVisible: false
  };

  handleVisibleChange = (visible: boolean) => {
    this.setState({ popoverVisible: visible });
  };

  render() {
    const { name, type } = this.props.card;

    const CompMap: any = {
      [CardType.Army]: (
        <ArmyCard
          onClose={() => {
            this.setState({ popoverVisible: false });
          }}
        />
      ),
      [CardType.Harvest]: (
        <HarvestCard
          onClose={() => {
            this.setState({ popoverVisible: false });
          }}
        />
      ),
      [CardType.Score]: <ScoreCard />
    };

    const { popoverVisible } = this.state;

    return (
      <Popover
        overlayStyle={{ maxWidth: 200 }}
        content={CompMap[type] || ""}
        title={name}
        autoAdjustOverflow
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className="cardItem">
          <p className="name">{name}</p>
        </div>
      </Popover>
    );
  }
}

export default CardItem;
