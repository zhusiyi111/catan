import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { debounce } from "lodash";
import { Players } from "../../models/player";
import { ResourceType, ResourceName, Resource } from "../../models/resource";

import "./index.less";
import { State } from "../../models";
import { getPlayerId, getPlayer } from "../../models/player/helper";
import { cloneDeep } from "lodash";

interface ResourcePanelProps {
  players: Players;
}

interface ResourcePanelState {
  addResource: { [k: string]: number };
}

const defaultResource: { [k: string]: number } = {
  [ResourceType.Brick]: 0,
  [ResourceType.Wheat]: 0,
  [ResourceType.Wood]: 0,
  [ResourceType.Sheep]: 0,
  [ResourceType.Ore]: 0
};

class ResourcePanel extends Component<ResourcePanelProps, ResourcePanelState> {
  state = {
    addResource: defaultResource
  };

  getResource = () => {
    const { players } = this.props;
    const cur = players.find(v => v.id === getPlayerId());
    if (cur) {
      return cur.resource;
    }
    return defaultResource;
  };

  getMyResource = (players: Players) => {
    const myId = getPlayerId();
    const me = getPlayer(myId, players);
    if (me) {
      return me.resource;
    }
    return undefined;
  };

  resetCompare = debounce(() => {
    this.setState({
      addResource: cloneDeep(defaultResource)
    });
  }, 2000);

  compareResource = (a: Resource, b: Resource) => {
    const result = cloneDeep(defaultResource);
    for (let i in result) {
      result[i] = a[i] - b[i];
    }
    this.setState(
      {
        addResource: result
      },
      () => {
        this.resetCompare();
      }
    );
  };

  componentWillReceiveProps(cur: ResourcePanelProps) {
    const prev = this.props;
    let curPlayers = cur.players;
    let prevPlayers = prev.players;
    if (!curPlayers || !prevPlayers) return;
    const curRes = this.getMyResource(cur.players);
    const prevRes = this.getMyResource(prev.players);
    if (curRes && prevRes) {
      this.compareResource(curRes, prevRes);
    }
  }

  render() {
    const resource = this.getResource();
    const { addResource } = this.state;
    let brickModify = 0;
    let sheepModify = 0;
    let oreModify = 0;
    let woodModify = 0;
    let wheatModify = 0;
    
    if (addResource) {
      brickModify = addResource[ResourceType.Brick];
      sheepModify = addResource[ResourceType.Sheep];
      woodModify = addResource[ResourceType.Wood];
      oreModify = addResource[ResourceType.Ore];
      wheatModify = addResource[ResourceType.Wheat];
    }

    return (
      <div className="resourcePanel">
        <div className={classnames(ResourceType.Wood, "resourseItem")}>
          {ResourceName[ResourceType.Wood]}:
          <span className="num">
            {resource[ResourceType.Wood]}
            <span
              className={classnames("modify", {
                add: woodModify > 0,
                minus: woodModify < 0
              })}
            >
              {woodModify}
            </span>
          </span>
        </div>
        <div className={classnames(ResourceType.Brick, "resourseItem")}>
          {ResourceName[ResourceType.Brick]}:
          <span className="num">
            {resource[ResourceType.Brick]}
            <span
              className={classnames("modify", {
                add: brickModify > 0,
                minus: brickModify < 0
              })}
            >
              {brickModify}
            </span>
          </span>
        </div>
        <div className={classnames(ResourceType.Sheep, "resourseItem")}>
          {ResourceName[ResourceType.Sheep]}:
          <span className="num">
            {resource[ResourceType.Sheep]}
            <span
              className={classnames("modify", {
                add: sheepModify > 0,
                minus: sheepModify < 0
              })}
            >
              {sheepModify}
            </span>
          </span>
        </div>
        <div className={classnames(ResourceType.Ore, "resourseItem")}>
          {ResourceName[ResourceType.Ore]}:
          <span className="num">
            {resource[ResourceType.Ore]}
            <span
              className={classnames("modify", {
                add: oreModify > 0,
                minus: oreModify < 0
              })}
            >
              {oreModify}
            </span>
          </span>
        </div>
        <div className={classnames(ResourceType.Wheat, "resourseItem")}>
          {ResourceName[ResourceType.Wheat]}:
          <span className="num">
            {resource[ResourceType.Wheat]}
            <span
              className={classnames("modify", {
                add: wheatModify > 0,
                minus: wheatModify < 0
              })}
            >
              {wheatModify}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
const mapState = (s: State) => ({
  players: s.players
});

export default connect(mapState)(ResourcePanel);
