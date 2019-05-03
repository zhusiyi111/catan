import React, { Component } from "react";
import { connect } from "react-redux";

import { Roll } from "../../models/roll";
import Dice from "./Dice";

import "./index.less";
import { State } from "../../models";
import { Round } from "../../models/round";
import { MatchId } from "../../models/matchId";

interface DiceAreaProps {
  roll: Roll;
  round: Round;
  matchId: MatchId;
}

class DiceArea extends Component<DiceAreaProps> {
  render() {
    const { roll, round, matchId } = this.props;
    return (
      <div className="diceArea">
        <div className="wrap">
          <span>当前比赛ID:{matchId}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Dice number={roll.rollA} />
          <span>+</span>
          <Dice number={roll.rollB} />
          <span>=&nbsp;{roll.rollA + roll.rollB}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>回合:{round}</span>
        </div>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  roll: s.roll,
  round: s.round,
  matchId: s.matchId
});

export default connect(mapState)(DiceArea);
