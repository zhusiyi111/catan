import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { IDot, DotLocation } from "../../models/dot";

import { AreaSize, AreaSpaceSize } from "../Area/index";

import "./index.less";

interface DotProps {
  dot: IDot;
  buildVillage: (location: DotLocation) => void;
}

export const DotSize = 30;

class Dot extends Component<DotProps> {
  getOffset = () => {
    const { location } = this.props.dot;
    const { x, y } = location;
    const left = AreaSize * x + AreaSpaceSize * (x > 0 ? x - 0.5 : 0);
    const top = AreaSize * y + AreaSpaceSize * (y > 0 ? y - 0.5 : 0);
    return { left, top };
  };

  onClick = () => {
    const { dot, buildVillage } = this.props;
    const { location } = dot;
    buildVillage(location);
  };

  render() {
    const {
      dot: { visible }
    } = this.props;
    return (
      <div
        className={classnames("dot", { visible: visible })}
        style={{
          width: DotSize,
          height: DotSize,

          ...this.getOffset()
        }}
        onClick={this.onClick}
      >
        {" "}
      </div>
    );
  }
}

const mapDispatch = (dispatch: any) => ({
  buildVillage: dispatch.villages.buildVillage
});

export default connect(
  null,
  mapDispatch
)(Dot);
