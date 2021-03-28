import React from 'react';
import {observer} from "mobx-react";
import {RootGoodsStore} from "../../store";
import {Col, Row, Typography} from "antd";
import * as _ from 'lodash';

const {Text} = Typography;
type Props = {
  rootStore: RootGoodsStore;
}
const GoodsTotalCountRender = ({rootStore}: Props) => {

  return (
    <Row  justify="end">
      <Col >
        <Text>Общая стоимость:</Text>
      </Col>
      <Col>
        <Text strong>
          {
            _.chain(rootStore.basketStore?.goods)
              .map((goods) => {
                return rootStore.exchangeRateStore?.calcPricePyRate(goods.quantity * goods.goods.price)
              })
              .sum()
              .value()
          }
        </Text>
      </Col>
    </Row>
  );
};

export const GoodsTotalCount = observer(GoodsTotalCountRender);
