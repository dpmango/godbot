import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import cns from 'classnames';

import loadingDotsAnimation from '@assets/animations/loading-dots.json';

export const Loader: FC<{}> = ({}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'loader' });

  return (
    <div className="loading-block">
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
