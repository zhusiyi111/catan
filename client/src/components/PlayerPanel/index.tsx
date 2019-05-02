import React, { Component } from "react";
import { connect } from "react-redux";

import "./index.less";
import { Players } from "../../models/player";
import Player from "./Player";
import { State } from "../../models";

interface PlayerPanelProps {
  players: Players;
}

class PlayerPanel extends Component<PlayerPanelProps> {
  render() {
    const { players } = this.props;
    return (
      <div className="playerPanel">
        {players.map(player => (
          <Player key={player.id} playerId={player.id} />
        ))}
      </div>
    );
  }
}

const mapState = (s: State) => ({
  players: s.players
});

export default connect(mapState)(PlayerPanel);
