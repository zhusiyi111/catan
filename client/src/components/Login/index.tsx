import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { reconnect } from "../../models/flow/service";
import { getPlayerId } from "../../models/player/helper";

import "./index.less";
import { getMatchId } from "../../models/matchId/helper";

interface LoginProps {}

interface LoginState {
  playerId: number;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    playerId: -1
  };

  componentDidMount() {
    const playerId = getPlayerId();
    this.setState({
      playerId
    });
  }

  reconnect = () => {
    let { playerId } = this.state;
    const matchId = getMatchId();
    if (!playerId || !matchId) {
      alert("没登录，先出去登录");
      window.location.href = "/";
    } else {
      reconnect();
    }
  };

  render() {
    return (
      <div className="login">
        <Button onClick={this.reconnect}>刷新</Button>
      </div>
    );
  }
}

export default connect(null)(Login);
