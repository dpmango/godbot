import { useEffect, useState, useLayoutEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import xorBy from 'lodash/xorBy';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector, getSignals } from '@store';
import { LockScreen } from '@ui/LockScreen';
import { Loader } from '@ui/Loader';
import { ISignal } from '@interface/Signal';

import { SignalCard, SignalsFilter } from '@c/Signal';

export const Signals: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.signalState);
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>('');
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [prevSignals, setPrevSignals] = useState<ISignal[] | null>(null);

  const handleClick = () => {
    setIsSelect(false);
    setFilter('');
  };

  const signalsWithFilter = useMemo(() => {
    if (filter && data?.length) {
      return data.filter(
        (elem) => elem?.status?.toLowerCase().trim() === filter?.split('|')[1].toLowerCase().trim()
      );
    }

    return data;
  }, [filter, data]);

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (userData?.allowed_functions.includes('Signal') && tariffActive) {
      dispatch(getSignals());

      timerConfirm.current = setInterval(() => {
        dispatch(getSignals());
      }, 1 * 60 * 1000);
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [userData?.allowed_functions[0], tariffActive]);

  useEffect(() => {
    const newSignals = xorBy(prevSignals, data, 'date');

    if (newSignals.length) {
      toast.info(`Добавлено ${newSignals.length} новых сигналов`);
    }

    setPrevSignals(data);
  }, [data]);

  return (
    <div className="signals">
      {!userData?.tariff?.includes('Trader') && !tariffActive && <LockScreen section="прогнозов" />}

      <div className="signals__top">
        <h2 className="title">Рекомендации по торговле</h2>
        {isSelect ? (
          <button className="chart__dropdown-button active" onClick={handleClick}>
            <span></span>
            {filter.split('|')[0]}
          </button>
        ) : (
          <SignalsFilter filter={setFilter} isSelected={setIsSelect} />
        )}
      </div>

      <div className="signals__inner">
        {signalsWithFilter?.length ? (
          <table>
            <thead>
              <tr>
                <th>Дата сигнала</th>
                <th>Наименование</th>
                <th>Тип ордера</th>
                <th>Статус сделки</th>
                <th>Цена входа</th>
                <th>Цена выхода</th>
                <th>Стоп-лосс</th>
                <th>Риск на сделку</th>
              </tr>
            </thead>
            <tbody>
              {signalsWithFilter?.map((x, idx) => (
                <SignalCard key={idx} signal={x} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="signals__nothing">Ничего не найдено!</div>
        )}
      </div>
      <ul className="signals__pagination">
        <Link to={'/recomenation/${page}'}></Link>
      </ul>
    </div>
  );
};
