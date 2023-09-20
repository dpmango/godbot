import { Toast } from '@ui';
import { Trans } from 'react-i18next';

export const PartnerSide = () => {
  const { partner } = useAppSelector((state) => state.userState);
  const inputRef = useRef(null);

  const { t } = useTranslation('partner');

  const referralLink = useMemo(() => {
    if (!partner?.id) return '';
    return `http://godbot.ai/?referrer_id=${partner.id}`;
  }, [partner?.id]);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(referralLink, inputRef?.current).then(() => {
      Toast('success', t('copy.copied'));
    });
  }, [referralLink, inputRef]);

  return (
    <div className="partnership__side partnership__side--right">
      <div className="partnership__block partnership__block--reflink">
        <div className="partnership__title">{t('copy.title')}</div>
        <div className="partnership__reflink">
          <input
            className="main-input"
            type="text"
            value={referralLink ? referralLink : ''}
            ref={inputRef}
            readOnly={true}
            onClick={handleCopy}
          />
          <div className="btn" onClick={handleCopy}>
            {t('copy.action')}
          </div>
        </div>
      </div>

      <div className="partnership__block partnership__block--discount">
        <div className="partnership__title">{t('instruction.info')}</div>
        <Trans
          t={t}
          i18nKey="instruction.percent"
          values={{ percent: partner?.referral_percent }}
        />
      </div>

      {/* <div className="partnership__block partnership__block--individual">
      <div className="partnership__title">Индивидуальная партнерская система</div>
      <ul className="partnership__individual">
        <li>
          1 уровень <strong>15%</strong>
        </li>
        <li>
          2 уровень <strong>10%</strong>
        </li>
        <li>
          3 уровень <strong>7%</strong>
        </li>
        <li>
          4 уровень <strong>3%</strong>
        </li>
        <li>
          5 уровень <strong>1%</strong>
        </li>
      </ul>
    </div> */}
    </div>
  );
};
