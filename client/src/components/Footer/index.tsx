import React from "react";

import CardPanel from "../CardPanel";
import ResourcePanel from "../ResourcePanel";
import MessagePanel from "../MessagePanel";

import "./index.less";

export default function() {
  return (
    <div className="footer">
      <MessagePanel />
      <CardPanel />
      <ResourcePanel />
    </div>
  );
}
