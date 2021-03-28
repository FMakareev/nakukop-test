import React from 'react';
import {Row, Col, Button} from 'antd';
import {Typography} from 'antd';
import {GoodsDto} from "../../api";
import {PriceCalcView} from './PriceView';
import {rootGoodsStore} from "../../index";
import {ExchangeRateStatusView} from "./ExchangeRateStatusView";
import {observer} from "mobx-react";

const {Text} = Typography;

type Props = GoodsDto;

export const GoodsItemRender = (props: Props) => {
  const {name, price, ID} = props;

  const addToBasket = () =>
    rootGoodsStore.basketStore?.addGoods(props)

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Text>
          {
            name
          }
        </Text>
      </Col>
      <Col span={4}>
        <Row>
          <Col>
            <PriceCalcView
              price={price}
              exchangeRate={rootGoodsStore.exchangeRateStore}
            /></Col>
          <Col>
            <ExchangeRateStatusView
              exchangeRate={rootGoodsStore.exchangeRateStore}
            />
          </Col>
        </Row>
      </Col>
      <Col span={3}>
        <Button
          type={rootGoodsStore.basketStore?.basketIncludesGoods(ID) ? "primary" : undefined}
          onClick={() => {
            if (rootGoodsStore.basketStore?.basketIncludesGoods(ID)) {
              rootGoodsStore.basketStore?.removeGoods(ID)
            } else {
              addToBasket();
            }
          }}>
          {rootGoodsStore.basketStore?.basketIncludesGoods(ID) ? "Удалить" : "В корзину"}
        </Button>
      </Col>
    </Row>
  );
};

export const GoodsItem = observer(GoodsItemRender)
