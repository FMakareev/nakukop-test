import {ApiStateEnum, ExchangeRateApi, ExchangeRateStatus} from "../api";
import {action, makeObservable, observable} from "mobx";

export class ExchangeRateStore {
  requestState: ApiStateEnum = ApiStateEnum.SUCCESS;

  currentExchangeRate: number = 0;
  prevExchangeRate: number = 0;
  exchangeRateStatus: ExchangeRateStatus = ExchangeRateStatus.NOT_CHANGE;

  exchangeRateApi?: typeof ExchangeRateApi;


  constructor(exchangeRateApi: typeof ExchangeRateApi) {

    this.exchangeRateApi = exchangeRateApi;

    makeObservable(this, {
      getExchangeRate: action,
      getExchangeRateStatus: action,
      requestState: observable,
      currentExchangeRate: observable,
      prevExchangeRate: observable,
      exchangeRateStatus: observable,
    })
  }

  getExchangeRate = async () => {
    try{
      this.requestState = ApiStateEnum.LOADING
      const result = await this.exchangeRateApi?.getExchangeRate();
      this.prevExchangeRate = this.currentExchangeRate;
      this.currentExchangeRate = result?.exchangeRates || this.currentExchangeRate;
      this.exchangeRateStatus = this.getExchangeRateStatus();
      this.requestState = ApiStateEnum.SUCCESS
      return result;
    } catch (e) {
      this.requestState = ApiStateEnum.REJECTED
      console.error(e);
    }
  };

  getExchangeRateStatus = (): ExchangeRateStatus => {
    if (this.currentExchangeRate > this.prevExchangeRate) {
      return ExchangeRateStatus.INCREASED;
    }
    if (this.currentExchangeRate < this.prevExchangeRate) {
      return ExchangeRateStatus.DECREASED;
    }
    return ExchangeRateStatus.NOT_CHANGE;
  }

  calcPricePyRate = (price: number): number => price * this.currentExchangeRate;

}
