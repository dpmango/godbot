import { FC, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { SpriteIcon } from '@ui';
// import './fader.sass';

interface ILockScreenProps {
  section: string;
  textModifier?: string;
}

export const LockScreen: FC<ILockScreenProps> = ({ section, textModifier }) => {
  const { tariffActive, isProUser, userData } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('ui', { keyPrefix: 'lock' });

  const action = useMemo(() => {
    return {
      prolong: userData?.tariff && !tariffActive,
      upgrade: !isProUser,
      activate: !userData?.tariff,
    };
  }, [userData?.tariff, tariffActive]);

  const translationKey = useMemo(() => {
    if (action.prolong) {
      return 'prolong';
    } else if (action.upgrade) {
      return 'upgrade';
    } else if (action.activate) {
      return 'activate';
    }

    return 'trial';
  }, [action]);

  return (
    <div className="fader fader--active">
      <div className={cns('fader__text', textModifier && `fader__text--${textModifier}`)}>
        <SpriteIcon name="lock" width="32" height="32" />
        <div>{t(`${translationKey}.text`, { section })}</div>

        <Link className="btn" to="?tariffs">
          {t(`${translationKey}.action`, { section })}
        </Link>
      </div>
    </div>
  );
};
