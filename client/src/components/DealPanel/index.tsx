import React, { Component } from "react";

import DealBlock from "./DealBlock";
import { Popover, Button } from "antd";

const text = <span>黑市交易</span>;
const content = <DealBlock />;

class DealPanel extends Component {
  render() {
    return (
      <div>
        <Popover
          placement="leftBottom"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>黑市交易</Button>
        </Popover>
      </div>
    );
  }
}

export default DealPanel;
