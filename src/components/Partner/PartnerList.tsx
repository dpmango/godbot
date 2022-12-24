import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@core';
import { formatPrice, formatDate } from '@utils';

export const PartnerList: React.FC<{}> = () => {
  const { partner } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('partner', { keyPrefix: 'list' });

  return (
    <div className="partnership__side partnership__side--left">
      <div className="partnership__block partnership__block--partners">
        <div className="partnership__title">{t('title')}</div>
        <div className="partnership__table">
          <table>
            <thead>
              <tr>
                <th>{t('table.id')}</th>
                <th>{t('table.date')}</th>
                <th className="partnership__table-center">{t('table.email')}</th>
                <th className="partnership__table-center">{t('table.earnings')}</th>
              </tr>
            </thead>
            <tbody>
              {partner?.referals.map((referral) => (
                <tr key={referral.id}>
                  <td>{referral.id}</td>
                  <td className="partnership__table-light">
                    {formatDate(referral.date || referral['Дата регистрации'])}
                  </td>
                  <td className="partnership__table-center">{referral.email}</td>
                  <td className="partnership__table-center partnership__table-price">
                    ${formatPrice(referral.earnings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
