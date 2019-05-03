import React, { Component, SyntheticEvent } from "react";
import { InputNumber, Form, Button, message } from "antd";
import { connect } from "react-redux";
import { FormComponentProps } from "antd/lib/form";
import classNames from "classnames";
import { ResourceType, ResourceName, Resource } from "../../../models/resource";
import { State } from "../../../models";
import { Players } from "../../../models/player";
import { PureRate, MultipleRate } from "../../../const.json";

import "./index.less";
import { getPlayerId } from "../../../models/player/helper";
import { getPlayer } from "../../../models/village/helper";
import { getResourceTotal } from "../../../models/resource/helper";

interface DeslBlockProps extends FormComponentProps {
  players: Players | undefined;
  dealInBlackMarket: ({
    giveResource,
    gainResource
  }: {
    giveResource: Resource;
    gainResource: Resource;
  }) => void;
}

class DealBlock extends Component<DeslBlockProps> {
  onlyOneType = (resource: Resource) => {
    let typeNum = 0;
    for (let i in resource) {
      if (resource[i] > 0) {
        typeNum++;
      }
    }
    return typeNum <= 1;
  };

  checkLegal = (giveResource: Resource, gainResource: Resource) => {
    const giveToal = getResourceTotal(giveResource);
    const gainTotal = getResourceTotal(gainResource);
    if (giveToal === 0) {
      message.error("想白嫖？");
      return false;
    }
    /* 如果给的全部都是同一种类型的资源，那么是PureRate汇率 */
    if (this.onlyOneType(giveResource)) {
      if (gainTotal * PureRate <= giveToal) {
        return true;
      } else {
        return false;
      }
    } else {
      /* 否则是MultipleRate汇率 */
      if (gainTotal * MultipleRate <= giveToal) {
        return true;
      } else {
        return false;
      }
    }
  };

  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const giveResource = {
          [ResourceType.Wood]: values.giveWood,
          [ResourceType.Brick]: values.giveBrick,
          [ResourceType.Sheep]: values.giveSheep,
          [ResourceType.Wheat]: values.giveWheat,
          [ResourceType.Ore]: values.giveOre
        };
        const gainResource = {
          [ResourceType.Wood]: values.gainWood,
          [ResourceType.Brick]: values.gainBrick,
          [ResourceType.Sheep]: values.gainSheep,
          [ResourceType.Wheat]: values.gainWheat,
          [ResourceType.Ore]: values.gainOre
        };

        if (!this.checkLegal(giveResource, gainResource)) {
          message.error(
            `交易条件不满足，请检查（单类资源汇率是${PureRate}:1,多类资源汇率是${MultipleRate}:1）`
          );
          return;
        } else {
          message.success("成功达成py交易");
          this.props.dealInBlackMarket({ giveResource, gainResource });
        }
      }
    });
  };

  getMyResource = (players: Players) => {
    const myId = getPlayerId();
    const me = getPlayer(myId, players);
    if (me) {
      return me.resource;
    }
    return undefined;
  };

  render() {
    const { players, form } = this.props;
    const { getFieldDecorator } = form;

    if (!players) return null;
    const resource = this.getMyResource(players);

    if (!resource) return null;

    return (
      <div className="dealBlock">
        <h2>汇率：{PureRate}个相同资源或{MultipleRate}个任意资源换1个所需资源</h2>
        <Form onSubmit={this.onSubmit}>
          <div className="operateArea">
            <div className="gain">
              <span className="text">得到</span>
              <Form.Item className="item">
                {getFieldDecorator("gainWood", { initialValue: 0 })(
                  <InputNumber min={0} max={9999} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("gainBrick", { initialValue: 0 })(
                  <InputNumber min={0} max={9999} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("gainSheep", { initialValue: 0 })(
                  <InputNumber min={0} max={9999} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("gainOre", { initialValue: 0 })(
                  <InputNumber min={0} max={9999} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("gainWheat", { initialValue: 0 })(
                  <InputNumber min={0} max={9999} />
                )}
              </Form.Item>
            </div>
            <div className="curResource">
              <span className="text">当前</span>
              <div className={classNames("resource", ResourceType.Wood)}>
                <div className={classNames("name")}>
                  {ResourceName[ResourceType.Wood]}
                </div>
                <div className="num">{resource[ResourceType.Wood]}</div>
              </div>
              <div className={classNames("resource", ResourceType.Brick)}>
                <div className={classNames("name")}>
                  {ResourceName[ResourceType.Brick]}
                </div>
                <div className="num">{resource[ResourceType.Brick]}</div>
              </div>
              <div className={classNames("resource", ResourceType.Sheep)}>
                <div className={classNames("name")}>
                  {ResourceName[ResourceType.Sheep]}
                </div>
                <div className="num">{resource[ResourceType.Sheep]}</div>
              </div>
              <div className={classNames("resource", ResourceType.Ore)}>
                <div className={classNames("name")}>
                  {ResourceName[ResourceType.Ore]}
                </div>
                <div className="num">{resource[ResourceType.Ore]}</div>
              </div>
              <div className={classNames("resource", ResourceType.Wheat)}>
                <div className={classNames("name")}>
                  {ResourceName[ResourceType.Wheat]}
                </div>
                <div className="num">{resource[ResourceType.Wheat]}</div>
              </div>
            </div>
            <div className="give">
              <span className="text">付出</span>
              <Form.Item className="item">
                {getFieldDecorator("giveWood", { initialValue: 0 })(
                  <InputNumber min={0} max={resource[ResourceType.Wood]} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("giveBrick", { initialValue: 0 })(
                  <InputNumber min={0} max={resource[ResourceType.Brick]} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("giveSheep", { initialValue: 0 })(
                  <InputNumber min={0} max={resource[ResourceType.Sheep]} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("giveOre", { initialValue: 0 })(
                  <InputNumber min={0} max={resource[ResourceType.Ore]} />
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("giveWheat", { initialValue: 0 })(
                  <InputNumber min={0} max={resource[ResourceType.Wheat]} />
                )}
              </Form.Item>
            </div>
          </div>
          <div className="">
            <Button type="primary" htmlType="submit">
              成交！
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  players: s.players
});

const mapProps = (dispatch: any) => ({
  dealInBlackMarket: dispatch.players.dealInBlackMarket
});

export default connect(
  mapState,
  mapProps
)(Form.create<DeslBlockProps>()(DealBlock));
