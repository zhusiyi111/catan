import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { reconnect } from "../../models/flow/service";
import { getPlayerId } from "../../models/player/helper";

import "./index.less";
import { getMatchId } from "../../models/matchId/helper";

interface LoginProps {}

interface LoginState {
  playerId: number;
}

class Login extends React.Component<
  LoginProps & RouteComponentProps,
  LoginState
> {
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
      this.props.history.push("/");
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

export default withRouter(connect(null)(Login));
