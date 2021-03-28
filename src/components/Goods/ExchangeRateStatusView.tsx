import React from 'react';
import {ExchangeRateStatus, Maybe} from "../../api";
import {ExchangeRateStore} from "../../store/ExchangeRateStore";
import {observer} from "mobx-react";
import {CaretUpFilled, CaretDownFilled} from '@ant-design/icons';

type Props = {
  exchangeRate: Maybe<ExchangeRateStore>;
}
export const ExchangeRateStatusViewRender = ({exchangeRate}: Props) => {
  return (
    <>
      {
        exchangeRate?.exchangeRateStatus === ExchangeRateStatus.INCREASED &&
				<CaretUpFilled style={{color: 'red'}}/>
      }
      {
        exchangeRate?.exchangeRateStatus === ExchangeRateStatus.DECREASED &&
				<CaretDownFilled style={{color: 'green'}}/>
      }
    </>
  );
};

export const ExchangeRateStatusView = observer(ExchangeRateStatusViewRender);
