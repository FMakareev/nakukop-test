import {ExchangeRateResult} from "./types";
import { random} from 'lodash';

export const ExchangeRateApi = {
  getExchangeRate: async (): Promise<ExchangeRateResult> => {
    return Promise.resolve({exchangeRates:random(20, 80)});
  }
}
