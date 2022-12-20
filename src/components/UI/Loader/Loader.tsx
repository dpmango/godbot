import { FC, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import cns from 'classnames';

import loadingDotsAnimation from '@assets/animations/loading-dots.json';
import st from './Loader.module.scss';

interface ILoaderProps {
  theme?: 'inline' | 'page' | 'overlay';
  active?: boolean;
  threshold?: number;
}

export const Loader: FC<ILoaderProps> = ({ theme = 'inline', active, threshold = 300 }) => {
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const { t } = useTranslation('ui', { keyPrefix: 'loader' });

  const timeLoading: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (active) {
      timeLoading.current = setTimeout(() => {
        setLoadingState(true);
      }, threshold);
    } else {
      setLoadingState(false);
    }

    return () => {
      clearInterval(timeLoading.current as NodeJS.Timeout);
    };
  }, [active]);

  return (
    <div
      className={cns(
        'loading-block',
        st.loader,
        theme && st[`_${theme}`],
        loadingState && st._active
      )}>
      <div className="loading-block__pic">
        <Lottie
          style={{ width: 70, height: 70 }}
          animationData={loadingDotsAnimation}
          loop={true}
          autoPlay={true}
        />
      </div>
      {theme === 'page' && (
        <>
          <div className="loading-block__big">{t('title')}</div>
          {t('description')}
        </>
      )}
    </div>
  );
};
