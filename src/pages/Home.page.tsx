import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { useProfile, useScrollLock, useWindowParams } from '@/core/hooks';
import { Loader } from '@ui';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@c/Charts';
import { Signals } from '@c/Signal';
import { Tutorial } from '@c/Layout/Tutorial/Tutorial';
import { MobileTurnMessage } from '@/components/Modal';

export const HomePage: React.FC<{}> = () => {
  const [loaderShown, setLoaderShown] = useState<boolean>(false);
  const { userData } = useAppSelector((state) => state.userState);
  const { data, currentCoin, currentTime } = useAppSelector((state) => state.forecastState);
  const { data: signalData } = useAppSelector((state) => state.signalState);
  const { isVerticalMobile } = useWindowParams();

  const { search } = useLocation();
  const { lockScroll, unlockScroll } = useScrollLock();
  const { allowedFunctions } = useProfile();

  const loading = useMemo(() => {
    if (loaderShown) return false;

    if (!userData) {
      return true;
    }
    if (allowedFunctions.forecast && !data.length) {
      return true;
    }
    //if (allowedFunctions.investing && !signalData?.length) {
    //return true;
    //}

    return false;
  }, [loaderShown, userData, allowedFunctions, data, signalData]);

  useEffect(() => {
    if (!search || search.includes('coin') || search.includes('time')) {
      if (loading) {
        lockScroll();
      } else {
        setLoaderShown(true);
        unlockScroll();
      }
    }
  }, [loading]);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      <Tutorial />

      <div className={cns('content', loading && 'content--loading')}>
        <div className="container">
          <Loader theme="page" active={loading} threshold={1} />

          <ChartsRouter />

          {isVerticalMobile && <MobileTurnMessage />}
        </div>
      </div>
    </Layout>
  );
};
