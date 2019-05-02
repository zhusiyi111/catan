import React from "react";

import CardPanel from "../CardPanel";
import ResourcePanel from "../ResourcePanel";

import "./index.less";

export default function() {
  return (
    <div className="footer">
      <CardPanel />
      <ResourcePanel />
    </div>
  );
}
