import { forwardRef, ForwardRefRenderFunction, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setStateCoin } from '@store/chartDataSlice.reducer';
import { useAppDispatch, useAppSelector } from '@store/hooks.store';
import { checkOnPro } from '@utils/scripts';
import { ChartDropdown } from '@c/Dropdown/ChartDropdown';
import { ChartUpdateTimer } from '@c/Charts/ChartUpdateTimer';

const ChartTable: React.FC<{}> = ({}, ref) => {
  const { userData, loading } = useAppSelector((state) => state.userState);
  const [timeChart, setTimeChart] = useState<string | null>('15 минут');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { currentCoin, data } = useAppSelector((state) => state.chartState);

  const handleTimeClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setTimeChart((e.target as HTMLElement).textContent);
  };

  const handleCoinClick: React.MouseEventHandler<HTMLElement> = (e) => {
    dispatch(setStateCoin((e.target as HTMLElement).textContent as string));
    navigate(
      `?coin=${(e.target as HTMLElement).textContent}?timestamp=${timeChart?.split(' ')[0]}`
    );
  };

  useEffect(() => {
    if (search) {
      dispatch(setStateCoin(search.slice(6, 9)));
    }
  }, [search]);

  if (loading !== 'fulfilled') return <div></div>;

  return (
    <div className="chart__head" ref={ref}>
      <h2 className="title">График прогноза</h2>
      <div className="chart__wrapper">
        <ChartDropdown title={currentCoin}>
          {data.data && (
            <ul>
              {Object.keys(data.data).map((elem, index) => (
                <li
                  onClick={handleCoinClick}
                  className={checkOnPro(userData) ? '' : 'pro'}
                  key={index}>
                  <p>{elem}</p>
                </li>
              ))}
              {checkOnPro(userData) ? (
                <li>
                  <button>Заказать просчет +</button>
                </li>
              ) : (
                ''
              )}
            </ul>
          )}
        </ChartDropdown>
        <ChartDropdown title={timeChart} disabled>
          {
            <ul>
              <li onClick={handleTimeClick}>15 минут</li>
            </ul>
          }
        </ChartDropdown>
      </div>
      {/* <ChartUpdateTimer /> */}
      <button className="chart__download">CКАЧАТЬ</button>
    </div>
  );
};

export default forwardRef(ChartTable as ForwardRefRenderFunction<React.ReactElement>);
