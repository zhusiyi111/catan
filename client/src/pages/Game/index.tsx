import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "../../components/Board";
import DiceArea from "../../components/DiceArea";

import { start } from "../../models/flow";

import Siderbar from "../../components/Sidebar";
import "./index.less";
import Login from "../../components/Login";
import Footer from "../../components/Footer";
import { State } from "../../models";

interface Props {
  round: number;
}
class GamePage extends Component<Props> {
  componentDidMount() {
    start();
  }
  render() {
    const { round } = this.props;
    const isReady = round && round !== -2;

    return (
      <div className="game">
        {isReady && (
          <>
            <Board />
            <Siderbar />
            <Footer />
            <DiceArea />
          </>
        )}
        <Login />
      </div>
    );
  }
}

const mapState = (s: State) => ({
  round: s.round
});

export default connect(mapState)(GamePage);
