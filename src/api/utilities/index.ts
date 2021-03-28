import * as fp from 'lodash/fp';
import {Goods, GoodsDto, GoodsName, GoodsNameDto, Group, GroupDto} from '../types';

export const getGoodsGroup = fp.get('G');
export const getGoodsIDGroup = fp.get('G');
export const getGoodsNames = fp.get('B');
export const getGoodsName = fp.get('N');
export const getGoodsPrice = fp.get('C');
export const getGoodsQuantity = fp.get('C');
export const getGoods = fp.get('Value.Goods');
export const getGoodsID = fp.get('T');
export const getID = fp.get('ID');
export const getName = fp.get('name');
export const getGroupID = fp.get('groupID');

export const getGroupDto = fp.flow<
    any,
  Array<[string, Group]>,
  Array<GroupDto>
  >(
  fp.entries,
  fp.map(([key, item]) => ({
    ID: fp.toString(key),
    name: getGoodsGroup(item),
  }))
)

export const getGoodsNamesDto = fp.flow<
  any,
  Array<[string, Group]>,
  Array<[{
    [k: string]: GoodsName;
  }]>,
  Array<Array<[string, GoodsName]>>,
  Array<[string, GoodsName]>,
  Array<GoodsNameDto>
  >(
  fp.entries,
  fp.map(([_, item]) => getGoodsNames(item)),
  fp.map(fp.entries),
  fp.flatten,
  fp.map(([key, item])=>({
    ID: fp.toString(key),
    name: getGoodsName(item),
  }))
)

export const goodsDto = (goodsNamesDto: GoodsNameDto[]) => fp.flow<
  any,
  Goods[],
  GoodsDto[]
  >(getGoods, fp.map((goods) => ({
  groupID: getGoodsIDGroup(goods),
  ID: fp.toString(getGoodsID(goods)),
  price: getGoodsPrice(goods),
  quantity: getGoodsQuantity(goods),
  name: fp.flow(fp.find((goodsDto) => getGoodsID(goods) == getID(goodsDto)), getName)(goodsNamesDto),
})))
