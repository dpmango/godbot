import { FC, useEffect, useRef, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@core';
import { LockScreen } from '@ui';

import { InvestingChart } from '@c/Charts';
// import './investing.sass';

interface IInvestingProps {}

export const Investing: FC<IInvestingProps> = () => {
  const { graphs } = useAppSelector((state) => state.investorState);
  const { isProUser } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('investing');

  return (
    <div className="investing">
      <div className="investing__grid">
        {graphs?.data?.map((investing, index) => (
          <div className="investing__block" key={index}>
            <div className="investing__name">
              <img src={investing.currency_icon} />
              <strong>{investing.currency}</strong> <span>{investing.currency_code}</span>
            </div>

            {isProUser ? (
              <InvestingChart id={investing.invest_id} />
            ) : (
              <LockScreen section={t('lock') as string} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
