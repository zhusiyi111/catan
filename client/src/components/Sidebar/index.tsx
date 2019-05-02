import React from "react";

import OperateMenu from "../OperateMenu";
import PlayerPanel from "../PlayerPanel";

import "./index.less";

export default function() {
  return (
    <div className="sideBar">
      <h1 className="title">Catan-HGNB！ v0.1.0</h1>
      <PlayerPanel />
      <OperateMenu />
    </div>
  );
}
