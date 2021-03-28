import React from 'react';
import {GoodsDto} from "../../api";
import { GoodsItem } from './GoodsItem';

type Props = {
  data: GoodsDto[];
}

export const GoodsList = ({data}: Props) => (
  <>
    {
      data.map((item) => (<GoodsItem key={item.name} {...item}/>))
    }
  </>
);
