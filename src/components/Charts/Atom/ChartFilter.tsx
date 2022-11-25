import { forwardRef, ForwardRefRenderFunction, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cns from 'classnames';

import { useAppDispatch, useAppSelector, setStateCoin } from '@store';
import { ChartDropdown } from '@/components/Charts';
import { Loader } from '@ui/Loader';

const ChartFilter: React.FC<{}> = ({}, ref) => {
  const { isProUser, loading } = useAppSelector((state) => state.userState);
  const [timeChart, setTimeChart] = useState<string | null>('15 минут');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { currentCoin, data } = useAppSelector((state) => state.forecastState);

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
          {data && Object.keys(data).length > 0 ? (
            <ul>
              {Object.keys(data).map((elem, index) => (
                <li onClick={handleCoinClick} className={cns(!isProUser && 'pro')} key={index}>
                  <p>{elem}</p>
                </li>
              ))}
              {isProUser && (
                <li>
                  <button>Заказать просчет +</button>
                </li>
              )}
            </ul>
          ) : (
            <Loader />
          )}
        </ChartDropdown>

        <ChartDropdown title={timeChart}>
          {
            <ul>
              <li onClick={handleTimeClick} className={cns(!isProUser && 'pro')}>
                15 минут
              </li>
              <li onClick={handleTimeClick} className={cns(!isProUser && 'pro')}>
                1 час
              </li>
              <li onClick={handleTimeClick} className={cns(!isProUser && 'pro')}>
                1 день
              </li>
            </ul>
          }
        </ChartDropdown>
      </div>
    </div>
  );
};

export default forwardRef(ChartFilter as ForwardRefRenderFunction<React.ReactElement>);
