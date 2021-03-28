import React from 'react';
import {observer} from "mobx-react";
import {Button, Col, InputNumber, Row, Table, Typography} from "antd";
import {toJS} from "mobx";
import {GoodsInBasket} from "../../store/BasketStore";
import {PriceCalcView} from "../Goods/PriceView";
import {getID} from "../../api";
import {RootGoodsStore} from "../../store";

const {Text} = Typography;
const {Column} = Table;

type Props = {
  goods: RootGoodsStore;
}

export const GoodsTableRender = ({goods}: Props) => {
  return (
    <Table dataSource={toJS(goods.basketStore?.goods)}>
      <Column dataIndex={['goods', 'name']} key={'goods.name'} title={'Название'}/>
      <Column
        dataIndex={['quantity']}
        key={'quantity'}
        title={'Количество'}
        render={(quantity, source: GoodsInBasket) => {
          return <Row>
            <Col>
              <InputNumber min={0} max={source.goods.quantity} value={quantity} onChange={(quantity) => {
                goods.basketStore?.changeQuantity(source.goods.ID, quantity)
              }}/>
            </Col>
            {
              quantity > 1 &&
							<Col>
                <PriceCalcView exchangeRate={goods.exchangeRateStore} price={source.goods.price}/>
								<Text>/шт.</Text>
							</Col>
            }
          </Row>
        }}
      />
      <Column dataIndex={['goods', 'price']} key={'goods.price'} title={'Цена'} render={(price, source: GoodsInBasket) => (<Row>
        <Col>
          <PriceCalcView exchangeRate={goods.exchangeRateStore} price={price * source.quantity}/>
        </Col>
      </Row>)}/>
      <Column title={''} render={(source) => {
        return <Button onClick={() => {
          goods.basketStore?.removeGoods(getID(source))
        }}>Удалить</Button>
      }}/>
    </Table>
  );
};
export const GoodsTable = observer(GoodsTableRender)
