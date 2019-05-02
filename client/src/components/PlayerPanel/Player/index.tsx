import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import { Player, PlayerId, Players } from "../../../models/player";
import { getResourceTotal } from "../../../models/resource/helper";
import "./index.less";
import { getPlayerId, getPlayer } from "../../../models/player/helper";
import { State } from "../../../models";
import { Icon } from "antd";

interface Props {
  players: Players;
  currentPlayer: PlayerId;
  playerId: PlayerId;
}

function PlayerItem(props: Props) {
  const { playerId, players, currentPlayer } = props;
  let player = getPlayer(playerId, players);
  if (!player) {
    return null;
  }
  const { name, resource, score, volume, cards, color } = player;
  const isMe = playerId === +getPlayerId();
  const isActive = currentPlayer === playerId;

  return (
    <div
      style={{ backgroundColor: color }}
      className={classnames("player", { isActive })}
    >
      <div className="firstLine">
        <div className="name">
          {name}
          {isMe ? "（我）" : ""}
        </div>
        <div className="score">
          <Icon type="star" title="分数" theme="filled" />

          <span className="num">{score}</span>
        </div>
      </div>

      <div className="secondLine">
        <div className="infoItem">
          资源:
          <span className="num">{getResourceTotal(resource)}</span>
        </div>
        <div className="infoItem">
          容量:
          <span className="num">{volume}</span>
        </div>
        <div className="infoItem">
          发展卡:
          <span className="num">{cards.length}</span>
        </div>
      </div>

      {/* <div className="id">{playerId}</div> */}
    </div>
  );
}

const mapState = (s: State) => ({
  players: s.players,
  currentPlayer: s.currentPlayer
});

export default connect(mapState)(PlayerItem);
