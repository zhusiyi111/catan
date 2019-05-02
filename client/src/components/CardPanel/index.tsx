import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlayerId, getPlayer } from "../../models/player/helper";
import classnames from "classnames";
import { State } from "../../models";
import { Cards } from "../../models/card";
import CardItem from "./CardItem";

import "./index.less";

interface CardPanelProps {
  cards: Cards;
  isMyRound: boolean;
}

class CardPanel extends Component<CardPanelProps> {
  render() {
    const { cards, isMyRound } = this.props;
    return (
      <div
        className={classnames("cardPanel", {
          disabled: !isMyRound
        })}
      >
        <div className="cardList">
          {cards.map((v, i) => (
            <CardItem key={i} card={v} />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = ({ players, currentPlayer }: State) => {
  const playerId = getPlayerId();
  const player = getPlayer(playerId, players);
  if (player) {
    const { cards } = player;
    return {
      cards: cards.sort((a, b) => (a.type > b.type ? 1 : -1)),
      isMyRound: playerId === currentPlayer
    };
  } else {
    return {
      cards: [],
      isMyRound: false
    };
  }
};

export default connect(mapState)(CardPanel);
