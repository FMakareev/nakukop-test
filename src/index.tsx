import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RootGoodsStore} from './store';
import {ExchangeRateApi, GoodsApi, GroupsApi} from './api';
import {GoodsStore} from "./store/GoodsStore";
import {ExchangeRateStore} from './store/ExchangeRateStore';
import {BasketStore} from './store/BasketStore';
import {autorun} from "mobx";


export const rootGoodsStore = new RootGoodsStore({
  goodsApi: GoodsApi,
  groupsApi: GroupsApi,
  exchangeRateApi: ExchangeRateApi,
  GoodsStore: GoodsStore,
  ExchangeRateStore: ExchangeRateStore,
  BasketStore: BasketStore
});
autorun(() => {
  console.log(rootGoodsStore.basketStore?.goods);
})


ReactDOM.render(
  <React.StrictMode>
    <App goods={rootGoodsStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
