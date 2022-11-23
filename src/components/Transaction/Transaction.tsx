import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector, getSignals } from '@store';
import { LockScreen } from '@ui/LockScreen';
import { Loader } from '@ui/Loader';
import { ISignal } from '@interface/Signal';

import { TransactionFilter } from './TransactionFilter';

export const Transaction: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.signalState);
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>('waiting');
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [recData, setRecData] = useState<ISignal[] | null>(null);

  useLayoutEffect(() => {
    if (userData?.allowed_functions.includes('Signal') && tariffActive) {
      dispatch(getSignals());
    }
  }, []);

  const checkStatus = (status: string) => {
    if (status === 'В ожидании') {
      return '#EFAD10';
    } else if (status === 'Отменена') {
      return '$colorRed;';
    } else if (status === 'Закрыта в прибыль, +10%') {
      return '#449C62';
    } else {
      return '$colorRed;';
    }
  };

  const handleClick = () => {
    setIsSelect(false);
    setFilter('');
  };

  useEffect(() => {
    let newData = null;
    if (filter && data) {
      newData = data.filter(
        (elem) => elem?.status?.toLowerCase().trim() === filter?.split('|')[1].toLowerCase().trim()
      );
    } else {
      newData = data;
    }

    setRecData(newData);
  }, [filter]);

  useLayoutEffect(() => {
    setRecData(data);
  }, [data]);

  return (
    <div className="recomendation">
      {!userData?.tariff?.includes('Trader') && !tariffActive && <LockScreen section="прогнозов" />}

      <div className="recomendation__top">
        <h2 className="title">Рекомендации по торговле</h2>
        {isSelect ? (
          <button className="chart__dropdown-button active" onClick={handleClick}>
            <span></span>
            {filter.split('|')[0]}
          </button>
        ) : (
          <TransactionFilter filter={setFilter} isSelected={setIsSelect} />
        )}
      </div>
      <div className="recomendation__inner">
        {recData?.length ? (
          <table>
            <thead>
              <th>Дата сигнала</th>
              <th>Наименование</th>
              <th>Тип ордера</th>
              <th>Статус сделки</th>
              <th>Цена входа</th>
              <th>Цена выхода</th>
              <th>Стоп-лосс</th>
              <th>Риск на сделку</th>
            </thead>
            <tbody>
              {recData?.map((elem, index) => (
                <tr key={index}>
                  <td>{elem.date}</td>
                  <td>
                    <div>
                      <img
                        src={`./images/${elem.currency.toLowerCase()}.png`}
                        alt={`Coin name ${elem.currency}`}
                      />{' '}
                      <p>{elem.currency}</p>
                    </div>
                  </td>
                  <td
                    style={{
                      color: elem.direction === 'SHORT' ? '$colorRed;' : '#449C62',
                    }}>
                    {elem.direction}
                  </td>
                  <td style={{ color: checkStatus(elem.status) }}>
                    {elem.stop_loss ? `${elem.status} ${elem.stop_loss}` : elem.status}
                  </td>
                  <td>
                    <span>
                      {elem.entry_price_range.map((item, idx) => (
                        <p key={idx}>${item}</p>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span>
                      {elem.get_exit_range.map((item, idx) => (
                        <p key={idx}>${item}</p>
                      ))}
                    </span>
                  </td>
                  <td>{elem.trigger_stop}</td>
                  <td>{elem.risk}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="recomendation__nothing">Ничего не найдено!</div>
        )}
      </div>
      <ul className="recomendation__pagination">
        <Link to={'/recomenation/${page}'}></Link>
      </ul>
    </div>
  );
};
