import React from 'react';
import {GroupItem} from "./GroupItem";
import {GoodsList} from "./GoodsList";
import {getID} from "../../api";
import {Typography} from "antd";
import {RootGoodsStore} from "../../store";
import {observer} from "mobx-react";
const {Title} = Typography;

type Props = {
  rootStore: RootGoodsStore;

}

export const GoodsContainerRender = ({rootStore}:Props) => {
  return (
    <>
      <Title>
        Товары
      </Title>
      {
        rootStore.goodsStore?.groups.map((item) => (<GroupItem header={item.name}>
          <GoodsList
            data={rootStore.goodsStore?.getGoodsByGroup(getID(item)) || []}
          />
        </GroupItem>))
      }
    </>
  );
};

export const GoodsContainer = observer(GoodsContainerRender);
