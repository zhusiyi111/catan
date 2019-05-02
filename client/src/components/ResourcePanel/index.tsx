import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Players } from "../../models/player";
import { ResourceType, ResourceName } from "../../models/resource";

import "./index.less";
import { State } from "../../models";
import { getPlayerId } from "../../models/player/helper";

interface ResourcePanelProps {
  players: Players;
}

const defaultResource = {
  [ResourceType.Brick]: 0,
  [ResourceType.Wheat]: 0,
  [ResourceType.Wood]: 0,
  [ResourceType.Sheep]: 0,
  [ResourceType.Ore]: 0
};

class ResourcePanel extends Component<ResourcePanelProps> {
  getResource = () => {
    const { players } = this.props;
    const cur = players.find(v => v.id === getPlayerId());
    if (cur) {
      return cur.resource;
    }
    return defaultResource;
  };

  render() {
    const resource = this.getResource();
    return (
      <div className="resourcePanel">
        <div className={classnames(ResourceType.Wood, "resourseItem")}>
          {ResourceName[ResourceType.Wood]}:
          <span className="num">{resource[ResourceType.Wood]}</span>
        </div>
        <div className={classnames(ResourceType.Brick, "resourseItem")}>
          {ResourceName[ResourceType.Brick]}:
          <span className="num">{resource[ResourceType.Brick]}</span>
        </div>
        <div className={classnames(ResourceType.Sheep, "resourseItem")}>
          {ResourceName[ResourceType.Sheep]}:
          <span className="num">{resource[ResourceType.Sheep]}</span>
        </div>
        <div className={classnames(ResourceType.Ore, "resourseItem")}>
          {ResourceName[ResourceType.Ore]}:
          <span className="num">{resource[ResourceType.Ore]}</span>
        </div>
        <div className={classnames(ResourceType.Wheat, "resourseItem")}>
          {ResourceName[ResourceType.Wheat]}:
          <span className="num">{resource[ResourceType.Wheat]}</span>
        </div>
      </div>
    );
  }
}
const mapState = (s: State) => ({
  players: s.players
});

export default connect(mapState)(ResourcePanel);
