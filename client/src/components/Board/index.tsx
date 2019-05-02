import React, { Component } from "react";
import { connect } from "react-redux";

import Area, { AreaSize, AreaSpaceSize } from "../Area";
import Dot from "../Dot";

import { IDot } from "../../models/dot";
import { IArea } from "../../models/area";
import { Status } from "../../models/status";

import "./index.less";
import { IVillage } from "../../models/village";
import Village from "../Village";
import { State } from "../../models";
import { getAreasSize } from "../../models/area/helper";

interface BoardProps {
  areas: IArea[];
  dots: IDot[];
  status: Status[];
  villages: IVillage[];
}

class Board extends Component<BoardProps> {
  calcBoardSize = () => {
    const { areas } = this.props;
    const { x, y } = getAreasSize(areas);
    const width = (x + 1) * (AreaSize + AreaSpaceSize) + 20;
    const height = (y + 1) * (AreaSize + AreaSpaceSize) + 20;
    return {
      width,
      height
    };
  };

  render() {
    const { areas, dots, status, villages } = this.props;
    const { width, height } = this.calcBoardSize();

    return (
      <div className="board">
        <div className="wrap" style={{ width, height }}>
          <div className="villages">
            {villages.map((v, i) => (
              <Village key={i} village={v} />
            ))}
          </div>
          {status.includes(Status.SelectDot) && (
            <div className="dots">
              {dots.map((v, i) => (
                <Dot key={i} dot={v} />
              ))}
            </div>
          )}
          <div className="areas">
            {areas.map((v, i) => (
              <Area key={i} area={v} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  areas: s.areas,
  dots: s.dots,
  status: s.status,
  villages: s.villages
});

export default connect(mapState)(Board);
