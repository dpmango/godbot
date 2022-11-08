import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useSkeleton } from "../../hooks/useSkeleton";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { getRecData } from "../../reducers/recDataSlice.reducer";
import { TransactionFilter } from "./TransactionFilter";
import { IRecObj } from "../../reducers/recDataSlice.reducer";
import { LockScreen } from "../UIelems/LockScreen";

export const Transaction: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.recState);
  const { userData, timeDiff } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>("");
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [recData, setRecData] = useState<IRecObj[]>();
  const { loaded } = useSkeleton(true);

  useLayoutEffect(() => {
    dispatch(getRecData());
  }, []);

  const checkStatus = (status: string) => {
    if (status === "В ожидании") {
      return "#EFAD10";
    } else if (status === "Отменена") {
      return "#CA390C";
    } else if (status === "Закрыта в прибыль, +10%") {
      return "#449C62";
    } else {
      return "#CA390C";
    }
  };

  const handleClick = () => {
    setIsSelect(false);
    setFilter("");
  };

  useEffect(() => {
    filter
      ? setRecData(data.signals?.filter((elem) => elem.status === filter))
      : setRecData(data.signals);
  }, [filter]);

  useLayoutEffect(() => {
    setRecData(data.signals);
  }, [data]);

  return (
    <div className="recomendation">
      {userData?.data.tariff === null || !timeDiff ? <LockScreen /> : ''}
      <div className="recomendation__top">
        <h2 className="title">Рекомендации по торговле</h2>
        {isSelect ? (
          <button
            className="chart__dropdown-button active"
            onClick={handleClick}
          >
            <span></span>
            {filter}
          </button>
        ) : (
          <TransactionFilter filter={setFilter} isSelected={setIsSelect} />
        )}
      </div>
      <div className="recomendation__inner">
        <ul className="recomendation__headers">
          <li className="recomendation__head">Дата сигнала</li>
          <li className="recomendation__head">Наименование</li>
          <li className="recomendation__head">Тип ордера</li>
          <li className="recomendation__head">Статус сделки</li>
          <li className="recomendation__head">Цена входа</li>
          <li className="recomendation__head">Цена выхода</li>
          <li className="recomendation__head">Стоп-лосс</li>
          <li className="recomendation__head">Риск на сделку</li>
        </ul>
        <ul className="recomendation__list">
          {recData?.map((elem, index) => (
            <li key={index + 1} className="recomendation__item">
              <div className="recomendation__item">
                {loaded ? (
                  <div style={{ width: "135px" }}>
                    <div className="skeleton-box">{elem.date}</div>
                  </div>
                ) : (
                  <p className="recomendation__signal">{elem.date}</p>
                )}
                <div className="recomendation__wrapper">
                  {loaded ? (
                    <div
                      className="skeleton-box"
                      style={{ width: "80px", height: "29px" }}
                    ></div>
                  ) : (
                    <>
                      <img
                        src={`./images/${elem.currency.toLowerCase()}.png`}
                        alt={`Coin name ${elem.currency}`}
                      />
                      <div>
                        <h6>{elem.currency} </h6>
                        <p>{elem.shortname}</p>
                      </div>
                    </>
                  )}
                </div>
                {loaded ? (
                  <div style={{ width: "190px" }}>
                    <div className="skeleton-box">{elem.direction}</div>
                  </div>
                ) : (
                  <p
                    className="recomendation__orderType"
                    style={{
                      color: elem.direction === "SHORT" ? "#CA390C" : "#449C62",
                    }}
                  >
                    {elem.direction}
                  </p>
                )}
                {loaded ? (
                  <div style={{ width: "226px" }}>
                    <div className="skeleton-box">{elem.status}-90%</div>
                  </div>
                ) : (
                  <p
                    className="recomendation__orderStatus"
                    style={{ color: checkStatus(elem.status) }}
                  >
                    {elem.stop_loss
                      ? `${elem.status} ${elem.stop_loss}`
                      : elem.status}
                  </p>
                )}
                <p className="recomendation__costs recomendation__costs--enter">
                  {elem.entry_price_range.map((elem, index) => (
                    <>
                      {loaded ? (
                        <div
                          className="skeleton-box"
                          key={index}
                          style={{ marginBottom: "5px" }}
                        >
                          ${elem}
                        </div>
                      ) : (
                        <span key={index}>${elem}</span>
                      )}
                    </>
                  ))}
                </p>
                <p className="recomendation__costs">
                  {elem.get_exit_range.map((elem, index) => (
                    <>
                      {loaded ? (
                        <div
                          className="skeleton-box"
                          key={index}
                          style={{ marginBottom: "5px" }}
                        >
                          ${elem}
                        </div>
                      ) : (
                        <span key={index}>${elem}</span>
                      )}
                    </>
                  ))}
                </p>
                {loaded ? (
                  <div style={{ width: "153px" }}>
                    <p className="skeleton-box">{elem.trigger_stop}</p>
                  </div>
                ) : (
                  <p className="recomendation__los">{elem.trigger_stop}</p>
                )}
                {loaded ? (
                  <div>
                    <p className="skeleton-box">{elem.risk}</p>
                  </div>
                ) : (
                  <p className="recomendation__risk">{elem.risk}%</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className="recomendation__pagination">
        <Link to={"/recomenation/${page}"}></Link>
      </ul>
    </div>
  );
};
