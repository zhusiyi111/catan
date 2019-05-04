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
import sound, { Sound, SoundType } from "../../components/Sound";

interface Props {
  round: number;
}
class GamePage extends Component<Props> {
  componentDidMount() {
    start();
    this.bindClickSound();
  }
  bindClickSound = () => {
    document.addEventListener("click", e => {
      if ((e.target as HTMLElement).classList.contains("sound_click")) {
        sound(SoundType.Click).play();;
      }
    });
  };

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
        <Sound />
      </div>
    );
  }
}

const mapState = (s: State) => ({
  round: s.round
});

export default connect(mapState)(GamePage);
