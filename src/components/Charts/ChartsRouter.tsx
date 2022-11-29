import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChart } from '@store';
import { useAppDispatch, useAppSelector } from '@store';

import { getInvesting } from '@store';
import { Loader } from '@ui/Loader';
import { ThemeContext } from '@/App';
import { LockScreen } from '@ui/LockScreen';

import { ChartTabs, ChartFilter, Forecast, Investing } from '@c/Charts';

// TODO - переделать табы на роутер

export const ChartsRouter: React.FC<{}> = () => {
  const ctx = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState<string>('Forecast');

  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const investorData = useAppSelector((state) => state.investorState);
  const addsRef: MutableRefObject<any> = useRef();
  const dispatch = useAppDispatch();

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (userData?.allowed_functions.includes('Forecast')) {
      dispatch(getChart('coin=BTC'));

      timerConfirm.current = setInterval(() => {
        dispatch(getChart('coin=BTC'));
      }, 1 * 60 * 1000);
    }

    if (!investorData.graphs.data?.length && userData?.allowed_functions.includes('Investing')) {
      dispatch(getInvesting());
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [userData?.allowed_functions[0]]);

  return (
    <div className={'table__wrapper'}>
      {(userData?.tariff || tariffActive) && (
        <ChartTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <div className="table__inner" ref={addsRef}>
        {(userData?.tariff === null || !tariffActive) && (
          <LockScreen section="графика нейронной сети" />
        )}
        <div
          className={'table'}
          style={{
            overflow: activeTab === 'Investing' ? 'visible' : 'hidden',
            maxHeight: activeTab === 'Investing' ? '100%' : '570px',
            background:
              window.innerWidth < 576 && activeTab === 'Investing'
                ? 'transparent'
                : ctx?.theme
                ? '#1c2326'
                : 'white',
          }}>
          {userData?.tariff === 'New' && (
            <div className="table__lock">
              <LockScreen section="графика нейронной сети" />
            </div>
          )}

          <div style={{ display: activeTab === 'Investing' ? 'none' : 'flex' }}>
            <ChartFilter />
          </div>

          {activeTab === 'Forecast' && <Forecast />}
          {activeTab === 'Investing' && <Investing />}
        </div>
      </div>
    </div>
  );
};
