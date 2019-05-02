import React from "react";
import { Row } from "antd";

import { CardDescription, CardType } from "../../../../models/card";
import store from "../../../../models";

const { dispatch } = store;

interface Props {
  onClose: () => void;
}
export default function ArmyCard(props: Props) {
  return (
    <div>
      <p>{CardDescription[CardType.Army]}</p>
      <div style={{ textAlign: "right" }}>
        <Row>
          <a
            onClick={() => {
              dispatch.status.clickUseArmyCard(undefined);
              props.onClose();
            }}
          >
            使用
          </a>
        </Row>
      </div>
    </div>
  );
}
