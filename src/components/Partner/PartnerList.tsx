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
          {partner?.referrals.length ? (
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
                {partner?.referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td>{referral.id}</td>
                    <td className="partnership__table-light">{formatDate(referral.date_joined)}</td>
                    <td className="partnership__table-center">{referral.email}</td>
                    <td className="partnership__table-center partnership__table-price">
                      ${formatPrice(referral.earnings)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="partnership__empty-text">
              <strong>😔</strong> {t('empty')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
