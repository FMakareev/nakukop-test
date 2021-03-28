import {ApiStateEnum, ExchangeRateApi, GoodsApi, GroupsApi} from "../api";
import {action, makeObservable, observable, observe} from "mobx"
import {GoodsStore} from "./GoodsStore";
import {ExchangeRateStore} from "./ExchangeRateStore";
import { BasketStore } from "./BasketStore";

type Props = {
  exchangeRateApi: typeof ExchangeRateApi;
  goodsApi: typeof GoodsApi;
  groupsApi: typeof GroupsApi;

  GoodsStore: typeof GoodsStore;
  ExchangeRateStore: typeof ExchangeRateStore;
  BasketStore: typeof BasketStore;
}


export class RootGoodsStore {
  requestState: ApiStateEnum = ApiStateEnum.SUCCESS;
  goodsStore?: GoodsStore;
  exchangeRateStore?: ExchangeRateStore;
  basketStore?: BasketStore;

  constructor({
                GoodsStore,
                ExchangeRateStore,
                BasketStore,
                exchangeRateApi,
                goodsApi,
                groupsApi,
              }: Props) {
    this.goodsStore = new GoodsStore({
      goodsApi,
      groupsApi,
    });
    this.exchangeRateStore = new ExchangeRateStore(exchangeRateApi);
    this.basketStore = new BasketStore();

    observe(this.goodsStore, () => {
      this.requestState = this.getRequestState();
    })
    observe(this.exchangeRateStore, () => {
      this.requestState = this.getRequestState();
    })

    makeObservable(this, {
      loadData: action,
      getRequestState: action,
      requestState: observable,
    })
    void this.loadData();
  }

  getRequestState = () => {
    const allRequestState = [this.exchangeRateStore?.requestState, this.goodsStore?.requestState];
    if (allRequestState.every((item) => item === ApiStateEnum.REJECTED)) {
      return ApiStateEnum.REJECTED;
    }
    if (allRequestState.every((item) => item === ApiStateEnum.SUCCESS)) {
      return ApiStateEnum.SUCCESS;
    }
    return ApiStateEnum.LOADING;
  }

  loadData = async () => {
    await Promise.all([
      this.goodsStore?.loadData(),
      this.exchangeRateStore?.getExchangeRate(),
    ]);
    setTimeout(this.loadData, 15000);
  }


}
