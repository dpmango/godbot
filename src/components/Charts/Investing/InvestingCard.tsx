import { FC, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppDispatch, useAppSelector } from '@core';
import { LockScreen } from '@ui';

import { InvestingChart } from '@c/Charts';
import { IInvesting } from '@core/interface/Investor';

interface ICardProps extends IInvesting {}

export const InvestingCard: FC<ICardProps> = ({
  invest_id,
  currency,
  currency_icon,
  currency_code,
  datetime,
  direction,
  isPlaceholder,
}) => {
  const { graphs } = useAppSelector((state) => state.investorState);
  const { isProUser, userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation('');

  return (
    <div className="investing__block">
      <div className="investing__name">
        <img src={currency_icon} />
        <strong>{currency}</strong> <span>{currency_code}</span>
        <div
          className={cns(
            'investing__name-type',
            direction === 'LONG' && 'investing__name-type--green',
            direction === 'SHORT' && 'investing__name-type--red'
          )}>
          {direction || 'NEUTRAL'}
        </div>
      </div>

      {!isPlaceholder ? (
        <InvestingChart id={invest_id} />
      ) : (
        <LockScreen
          section={t('investing.lock') as string}
          postText={t('investing.lockPost') as string}
        />
      )}
    </div>
  );
};
