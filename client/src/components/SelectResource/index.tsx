import React, { Component } from "react";
import { Select } from "antd";
import { ResourceType, ResourceName } from "../../models/resource";

import './index.less';

const Option = Select.Option;

interface SelectResouceProps {
  defaultValue: ResourceType;
  onChange: (value: ResourceType) => void;
}

class SelectResouce extends Component<SelectResouceProps> {
  static defaultProps = {
    defaultValue: ResourceType.Wood
  };

  handleChange = (value: ResourceType) => {
    this.props.onChange(value);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <div>
        <Select
          defaultValue={defaultValue}
          className="selectResource"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value={ResourceType.Wood}>
            {ResourceName[ResourceType.Wood]}
          </Option>
          <Option value={ResourceType.Brick}>
            {ResourceName[ResourceType.Brick]}
          </Option>
          <Option value={ResourceType.Sheep}>
            {ResourceName[ResourceType.Sheep]}
          </Option>
          <Option value={ResourceType.Wheat}>
            {ResourceName[ResourceType.Wheat]}
          </Option>
          <Option value={ResourceType.Ore}>
            {ResourceName[ResourceType.Ore]}
          </Option>
        </Select>
      </div>
    );
  }
}

export default SelectResouce;
