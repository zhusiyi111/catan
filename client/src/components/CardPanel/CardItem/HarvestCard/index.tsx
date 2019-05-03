import React, { useState } from "react";
import { Row, Button } from "antd";
import { connect } from "react-redux";

import SelectResource from "../../../SelectResource";
import { CardDescription, CardType } from "../../../../models/card";
import { ResourceType } from "../../../../models/resource";

const defaultType = ResourceType.Wood;

interface HarvestCardProps {
  useHarvestCard: (type: ResourceType) => void;
  onClose: () => void;
}

function HarvestCard(props: HarvestCardProps) {
  const [resource, setResource] = useState(defaultType);

  return (
    <div>
      <p>{CardDescription[CardType.Harvest]}</p>
      <div style={{ textAlign: "right" }}>
        <Row>
          <label>选择资源：</label>
          <SelectResource
            defaultValue={defaultType}
            onChange={value => setResource(value)}
          />
        </Row>
        <Row>
          <Button
            onClick={() => {
              props.useHarvestCard(resource);
              props.onClose();
            }}
          >
            使用
          </Button>
        </Row>
      </div>
    </div>
  );
}

const mapDispatch = (dispatch: any) => ({
  useHarvestCard: dispatch.players.useHarvestCard
});

export default connect(
  null,
  mapDispatch
)(HarvestCard);
