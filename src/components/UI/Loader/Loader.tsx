import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import cns from 'classnames';

import loadingDotsAnimation from '@assets/animations/loading-dots.json';
import st from './Loader.module.scss';

interface ILoaderProps {
  theme?: string;
  active?: boolean;
}

export const Loader: FC<ILoaderProps> = ({ theme = 'inline', active = true }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'loader' });

  return (
    <div
      className={cns('loading-block', st.loader, theme && st[`_${theme}`], active && st._active)}>
      <div className="loading-block__pic">
        <Lottie
          style={{ width: 70, height: 70 }}
          animationData={loadingDotsAnimation}
          loop={true}
          autoPlay={true}
        />
      </div>
      <div className="loading-block__big">{t('title')}</div>
      {t('description')}
    </div>
  );
};