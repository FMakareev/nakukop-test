import React from 'react';
import {observer} from "mobx-react"
import {Row, Col} from 'antd';
import {RootGoodsStore} from './store';
import {BasketContainer } from './components';
import { GoodsContainer } from './components/Goods/GoodsContainer';
import {rootGoodsStore} from "./index";


type Props = {
  goods: RootGoodsStore;
}

const App = ({goods}: Props) => {
  return (
    <div className="App">
      <Row>
        <Col span={12} offset={6}>
          <GoodsContainer rootStore={rootGoodsStore}/>

          <BasketContainer/>
        </Col>
      </Row>
    </div>
  );
}

export default observer(App);
