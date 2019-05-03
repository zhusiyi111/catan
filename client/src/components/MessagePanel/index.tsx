import React, { Component } from "react";

import "./index.less";

class MessagePanel extends Component {
  render() {
    return (
      <div className="messagePanel">
        <h3>信息看板</h3>
        <div className="content">
          <div className="messageWrap" id="MessageBox">
            <p>战斗信息</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MessagePanel;
