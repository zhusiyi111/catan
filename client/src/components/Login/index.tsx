import React from "react";
import { Button, Row } from "antd";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { reconnect } from "../../models/flow/service";
import { getPlayerId } from "../../models/player/helper";

import "./index.less";
import { getMatchId } from "../../models/matchId/helper";

const ScaleKey = "scaleNum";

interface LoginProps {}

interface LoginState {
  playerId: number;
  scale: number;
}

class Login extends React.Component<
  LoginProps & RouteComponentProps,
  LoginState
> {
  state = {
    playerId: -1,
    scale: 10
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

  scalePlus = () => {
    const target = document.querySelector(".boardWrap");
    let { scale } = this.state;
    scale -= 1;
    if (target && scale > 0) {
      target.className = `boardWrap scale-${scale}`;
      this.setState({ scale });
    }
  };

  scaleMinus = () => {
    const target = document.querySelector(".boardWrap");
    let { scale } = this.state;
    scale += 1;
    if (target && scale <= 12) {
      target.className = `boardWrap scale-${scale}`;
      this.setState({ scale });
    }
  };

  render() {
    return (
      <div className="login">
        <Button onClick={this.reconnect}>刷新</Button>
        <Button
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          返回
        </Button>
        <Row>
          <div className="scaleBtn plus" onClick={this.scalePlus}>
            +
          </div>
          <div className="scaleBtn minus" onClick={this.scaleMinus}>
            -
          </div>
        </Row>
      </div>
    );
  }
}

export default withRouter(connect(null)(Login));
