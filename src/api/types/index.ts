
export type ApiRequestResult<TValue> = {
  "Error": string;
  "Id": number;
  "Success": boolean;
  "Value": TValue
}

export type Maybe<T> = T | undefined;

export type Goods = {
  "B": boolean;
  // цена в долларах(USD)
  "C": number;
  "Pl": null;
  "CV": null;
  // id группы
  "G": number;
  // сколько единиц товара осталось
  "P": number;
  // id товара
  "T": number;
}

export type GoodsResult = ApiRequestResult<{
  Goods: Goods[];
}>

export type GoodsName = {
  // название товара
  N: string;
  // id товара
  T: number;
}

export type Group = {
  // название категории
  G: string;
  C: number;
  // список продуктов
  B: {
    [k: string]: GoodsName;
  }
}

export type GroupResult = ApiRequestResult<{
  [k: string]: Group;
}>


export type ExchangeRateResult = {
  exchangeRates: number;
}
export enum ExchangeRateStatus {
  NOT_CHANGE,
  INCREASED,
  DECREASED
}

export enum ApiStateEnum {
  SUCCESS,
  LOADING,
  REJECTED,
}

export type GroupDto = {
  ID: string;
  name: string;
}

export type GoodsNameDto = {
  ID: string;
  name: string;
}
export type GoodsDto = {
  groupID: string;
  ID: string;
  price: number;
  quantity: number;
  name: string;
}
