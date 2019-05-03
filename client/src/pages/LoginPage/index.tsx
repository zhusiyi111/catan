import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { ready } from "../../models/flow/service";
import { getPlayerId, setPlayerId } from "../../models/player/helper";

import "./index.less";
import { Input, Button } from "antd";
import { getMatchId, setMatchId } from "../../models/matchId/helper";
import { MatchId } from "../../models/matchId";

interface LoginProps {}

interface LoginState {
  playerId: number;
  matchId: MatchId;
}

class Login extends React.Component<
  LoginProps & RouteComponentProps,
  LoginState
> {
  state = {
    playerId: -1,
    matchId: -1
  };

  componentDidMount() {
    const playerId = getPlayerId();
    const matchId = getMatchId();
    this.setState({
      playerId,
      matchId
    });
  }

  onReady = async () => {
    let { playerId } = this.state;
    if (!playerId || playerId <= 0) {
      alert("请输入用户Id");
      return;
    }

    let { matchId } = this.state;
    if (!matchId || matchId <= 0) {
      alert("请输入比赛Id");
      return;
    }

    setPlayerId(+playerId);
    setMatchId(matchId);

    await ready();

    setTimeout(() => {
      this.props.history.push("/game");
    }, 500);
  };

  enterMatch = () => {
    let { playerId } = this.state;
    if (!playerId || playerId <= 0) {
      alert("请输入用户Id");
      return;
    }

    let { matchId } = this.state;
    if (!matchId || matchId <= 0) {
      alert("请输入比赛Id");
      return;
    }

    setPlayerId(+playerId);
    setMatchId(matchId);
    setTimeout(() => {
      window.location.href = "/game";
    }, 500);
  };

  render() {
    return (
      <div className="login">
        <div>
          <label>输入用户ID:</label>
          <Input
            type="number"
            width={300}
            placeholder="输入一个大于0的数字，注意不要和别人冲突了"
            value={this.state.playerId || ""}
            onChange={e => {
              this.setState({ playerId: +e.target.value });
            }}
          />
        </div>
        <div>
          <label>输入比赛ID:</label>
          <Input
            type="number"
            width={300}
            placeholder="输入由高贵的作者告诉你的比赛ID"
            value={this.state.matchId || ""}
            onChange={e => {
              this.setState({ matchId: +e.target.value });
            }}
          />
        </div>
        <br />
        <Button type="primary" onClick={this.enterMatch}>
          断线重连
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" onClick={this.onReady}>
          开始新比赛
        </Button>
      </div>
    );
  }
}

export default withRouter(Login);
