import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChart } from '@store';
import { useAppDispatch, useAppSelector } from '@store';
import { SideAdds } from '@c/SideAdds/SideAdds';
import { TableSwitch } from './TableSwitch';

import '../Charts/chart.scss';
import { Echrt } from '@c/Charts/Echrt';
import ChartTable from '@c/Charts/ChartTable';
import { LockScreen } from '@ui/LockScreen';
import { getInvesting } from '@store';
import { InvestorChart } from '@c/Charts/InvestorChart';
import { ThemeContext } from '@/App';

export const Table: React.FC<{}> = () => {
  const [visible, setVisible] = useState(true);
  const ctx = useContext(ThemeContext);
  const [investorTable, setInvestorTable] = useState(false);
  const { data } = useAppSelector((state) => state.chartState);
  const investorData = useAppSelector((state) => state.investorState);
  const { userData, timeDiff } = useAppSelector((state) => state.userState);
  const [chartLines, setChartLines] = useState(data);
  const addsRef: MutableRefObject<any> = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData?.allowed_functions.includes('Forecasst') && !timeDiff) {
      dispatch(getChart('coin=BTC'));
    }
  }, []);

  useEffect(() => {
    setChartLines(data);
  }, [data]);

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (
      !investorData.graphs.data?.length &&
      userData?.allowed_functions.includes('Investing') !== null &&
      !timeDiff
    ) {
      dispatch(getInvesting());
    }
  }, []);

  return (
    <div className={!visible ? 'table__wrapper _hidden' : 'table__wrapper'}>
      {userData?.tariff === null || timeDiff ? (
        ''
      ) : (
        <TableSwitch investorTable={investorTable} setInvestorTable={setInvestorTable} />
      )}
      <div className="table__inner" ref={addsRef}>
        {timeDiff || userData?.tariff === null ? <LockScreen /> : ''}
        <div
          className={visible ? 'table' : 'table table--hidden'}
          style={{
            overflow: investorTable ? 'visible' : 'hidden',
            maxHeight: investorTable ? '100%' : '570px',
            background:
              window.innerWidth < 576 && investorTable
                ? 'transparent'
                : ctx?.theme
                ? '#1c2326'
                : 'white',
          }}>
          {userData?.tariff === 'New' ? (
            <div className="table__lock">
              <div>
                <img src="./images/Lock.svg" alt="Lock" />
                <p>Для отображения графика нейронной сети необходимо выбрать тариф</p>
                <Link className="table__link" to={'/payment'}>
                  ВЫБРАТЬ ТАРИФ
                </Link>
              </div>
            </div>
          ) : (
            ''
          )}
          <div style={{ display: investorTable ? 'none' : 'flex' }}>
            <ChartTable />
          </div>
          {!investorTable ? (
            <Echrt
              containerWidth={addsRef.current?.clientWidth}
              axisColor={ctx?.theme ? '#303235' : '#ccc5ff7b'}
            />
          ) : (
            <InvestorChart />
          )}
        </div>
        {/* <SideAdds setVisible={handleClick} visible={visible} /> */}
      </div>
    </div>
  );
};
