import React, {useEffect, useState} from 'react';
import {Typography} from 'antd';
import {observer} from "mobx-react";
import {ExchangeRateStore} from "../../store/ExchangeRateStore";
import {Maybe} from '../../api';

const {Text} = Typography;

type Props = {
  price: number;
  exchangeRate: Maybe<ExchangeRateStore>;
}

export const PriceCalcViewRender = ({exchangeRate, price}: Props) => {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(exchangeRate?.calcPricePyRate(price) || price)
  }, [exchangeRate?.currentExchangeRate, price])

  return (
    <Text strong>
      {
        state
      }
    </Text>
  );
};

export const PriceCalcView = observer(PriceCalcViewRender);
