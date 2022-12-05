import { FC, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { SpriteIcon } from '@ui';
import { useTariff } from '@hooks';

// import './fader.sass';

interface ILockScreenProps {
  section: string;
  textModifier?: string;
}

export const LockScreen: FC<ILockScreenProps> = ({ section, textModifier }) => {
  const { tariffActive, isProUser, userData } = useAppSelector((state) => state.userState);

  const { activateTrial } = useTariff();

  const { t } = useTranslation('ui', { keyPrefix: 'lock' });

  const action = useMemo(() => {
    return {
      trial: !userData?.tariff,
      prolong: userData?.tariff && !tariffActive,
      upgrade: !isProUser,
      activate: !userData?.tariff,
    };
  }, [userData?.tariff, tariffActive]);

  const translationKey = useMemo(() => {
    if (action.trial) {
      return 'trial';
    } else if (action.prolong) {
      return 'prolong';
    } else if (action.activate) {
      return 'activate';
    } else if (action.upgrade) {
      return 'upgrade';
    }

    return 'trial';
  }, [action]);

  const handleTrialClick = useCallback(() => {
    activateTrial();
  }, []);

  return (
    <div className="fader fader--active">
      <div className={cns('fader__text', textModifier && `fader__text--${textModifier}`)}>
        <SpriteIcon name="lock" width="32" height="32" />
        <div>{t(`${translationKey}.text`, { section })}</div>

        {translationKey === 'trial' ? (
          <a href="#" className="btn" onClick={handleTrialClick}>
            {t(`${translationKey}.action`, { section })}
          </a>
        ) : (
          <Link className="btn" to="?tariffs">
            {t(`${translationKey}.action`, { section })}
          </Link>
        )}
      </div>
    </div>
  );
};
