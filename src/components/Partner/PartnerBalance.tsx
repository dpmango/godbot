import { Trans } from 'react-i18next';


export const PartnerBalance = () => {
  const { partner } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('partner', { keyPrefix: 'balance' });
  const { pathname } = useLocation();

  const statsKeys = [
    { label: 'referral_count', value: partner?.referral_count },
    { label: 'conversion', value: partner?.conversion },
    { label: 'total_earnings', value: partner?.total_earnings },
  ];

  return (
    <div className="partnership__balance">
      <div className="partnership__balance-acc">
        <div className="partnership__balance-label">{t('account')}</div>
        <div className="partnership__balance-sum">${formatPrice(partner?.balance, 0)}</div>
        <Link className="btn" to={`${pathname}?withdraw`}>
          {t('withdraw')}
        </Link>
      </div>

      {statsKeys.map((x, idx) => (
        <div className="partnership__balance-info" key={idx}>
          <Trans t={t} i18nKey={x.label} />
          <strong>{x.value}</strong>
        </div>
      ))}
    </div>
  );
};
