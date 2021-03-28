import {action, makeObservable, observable} from "mobx";
import * as _ from 'lodash';
import {getID, GoodsDto} from "../api";

export type GoodsInBasket = {
  ID: string;
  quantity: number;
  goods: GoodsDto;
}

export class BasketStore {
  goods: GoodsInBasket[] = [];

  constructor() {
    makeObservable(this, {
      goods: observable.deep,
      addGoods: action,
      removeGoods: action,
      changeQuantity: action,
    });
  }

  addGoods = (goods: GoodsDto): boolean => {
    console.log('addGoods: ',goods);
    if (this.basketIncludesGoods(getID(goods))) {
      return false;
    }
    this.goods.push({
      ID: getID(goods),
      quantity: 1,
      goods,
    });
    console.log('addGoods this.goods: ',this.goods);
    return true;
  }

  removeGoods = (id: string) => {
    if (!this.basketIncludesGoods(id)) {
      return false;
    }
    return _.remove(this.goods, (item) => getID(item) === id)
  }

  changeQuantity = (id: string, quantity: number) => {
    if (!this.basketIncludesGoods(id)) {
      return false;
    }
    if (quantity <= 0) {
      return this.removeGoods(id)
    }
    return _.chain(this.goods).find((item) => getID(item) === id ).set('quantity', quantity).value();
  }

  basketIncludesGoods = (id: string) => _.chain(this.goods).map(getID).includes(id).value()

}
