import React, { Component } from "react";
import { connect } from "react-redux";

import DealBlock from "./DealBlock";
import { Popover, Button } from "antd";
import { select, State } from "../../models";

const text = <span>黑市交易</span>;
const content = <DealBlock />;

interface DealPanelProps {
  isMyRound: boolean;
}

class DealPanel extends Component<DealPanelProps> {
  render() {
    const { isMyRound } = this.props;
    return (
      <div>
        <Popover
          placement="leftBottom"
          title={text}
          content={content}
          trigger="click"
        >
          <Button disabled={!isMyRound}>黑市交易</Button>
        </Popover>
      </div>
    );
  }
}

// TODO type
const mapState = select((s: any) => ({
  isMyRound: s.currentPlayer.isMyRound
}));

export default connect(mapState)(DealPanel);
