import { useCallback, useMemo, useRef } from 'react';
import cns from 'classnames';
import { useTranslation, Trans } from 'react-i18next';

import { useAppSelector } from '@core';
import { copyToClipboard } from '@utils';
import { Toast } from '@ui';

export const PartnerSide: React.FC<{}> = () => {
  const { partner } = useAppSelector((state) => state.userState);
  const inputRef = useRef(null);

  const { t } = useTranslation('partner');

  const copyLink = useMemo(() => {
    if (!partner?.id) return '';
    return `https://app.devgodbot.ru/?referrer_id=${partner.id}`;
  }, [partner?.id]);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(copyLink, inputRef?.current).then(() => {
      Toast('success', t('copy.copied'));
    });
  }, [copyLink, inputRef]);

  return (
    <div className="partnership__side partnership__side--right">
      <div className="partnership__block partnership__block--reflink">
        <div className="partnership__title">{t('copy.title')}</div>
        <div className="partnership__reflink">
          <input
            className="main-input"
            type="text"
            value={copyLink ? copyLink : ''}
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
        <Trans t={t} i18nKey="instruction.percent" values={{ percent: 20 }} />
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
