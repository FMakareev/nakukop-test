import { sleep } from '../utilities';
import { GoodsResult } from './types';
import DATA from './__mocks__/data.json';


export const GoodsApi = {
  getGoods: async (): Promise<GoodsResult> => {
    await sleep(0);
    return Promise.resolve(DATA as unknown as GoodsResult);
  }
}
