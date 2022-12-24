import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@core';
import { formatPrice } from '@utils';

export const PartnerBalance: React.FC<{}> = () => {
  const { partner } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('partner', { keyPrefix: 'balance' });

  return (
    <div className="partnership__balance">
      <div className="partnership__balance-acc">
        <div className="partnership__balance-label">{t('account')}</div>
        <div className="partnership__balance-sum">${formatPrice(partner?.balance, 0)}</div>
        {/* <a className="btn">{t('withdraw')}</a> */}
      </div>

      {/* <div className="partnership__balance-info">
        <span>
          Заработок
          <br />с нами
        </span>
        <strong>85.05%</strong>
      </div>
      <div className="partnership__balance-info">
        <span>
          Количество
          <br />
          сигналов
        </span>
        <strong>14 789</strong>
      </div>
      <div className="partnership__balance-info">
        <span>
          Проходимость
          <br />
          сигналов
        </span>
        <strong>98.5%</strong>
      </div> */}
    </div>
  );
};
