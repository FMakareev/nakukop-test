import {Col, Row, Typography} from 'antd';
import React from 'react';
import {rootGoodsStore} from "../../index";
import {GoodsTable} from './GoodsTable';
import {GoodsTotalCount} from "./GoodsTotalCount";

const {Title} = Typography;

export const BasketContainer = () => {
  return (
    <>
      <Title>
        Корзина
      </Title>
      <Row gutter={26}>
        <Col span={24}>
          <GoodsTotalCount rootStore={rootGoodsStore}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <GoodsTable goods={rootGoodsStore}/>
        </Col>
      </Row>
    </>
  );
};
