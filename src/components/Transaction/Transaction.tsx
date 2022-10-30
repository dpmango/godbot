import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useSkeleton } from "../../hooks/useSkeleton";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { getRecData } from "../../reducers/recDataSlice.reducer";
import { TransactionFilter } from "./TransactionFilter";
import { IRecObj } from "../../reducers/recDataSlice.reducer";

export const Transaction: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.recState);
  const { userData } = useAppSelector((state) => state.userState);
  const [filter, setFilter] = useState<string>("");
  const [recData, setRecData] = useState<IRecObj[]>();
  const { loaded } = useSkeleton(Boolean(recData));

  useLayoutEffect(() => {
    dispatch(getRecData("/rec"));
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

  useEffect(() => {
    filter
      ? setRecData(data.filter((elem) => elem.order_status === filter))
      : setRecData(data);
  }, [filter]);

  useLayoutEffect(() => {
    setRecData(data);
  }, [data]);

  return (
    <div className="recomendation">
      {userData?.rank === "New" ? (
        <div className="table__lock">
          <div>
            <img src="./images/Lock.svg" alt="Lock" />
            <p>
              Для отображения графика нейронной сети необходимо выбрать тариф
            </p>
            <Link className="table__link" to={"/payment"}>
              ВЫБРАТЬ ТАРИФ
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="recomendation__top">
        <h2 className="title">Рекомендации по торговле</h2>
        <TransactionFilter filter={setFilter} />
      </div>
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
          <li key={index} className="recomendation__item">
            <div className="recomendation__item">
              {loaded ? (
                <div style={{ width: "135px" }}>
                  <div className="skeleton-box">{elem.signal}</div>
                </div>
              ) : (
                <p className="recomendation__signal">{elem.signal}</p>
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
                      src={`./images/${elem.icon}`}
                      alt={`Coin name ${elem.name}`}
                    />
                    <div>
                      <h6>{elem.name} </h6>
                      <p>{elem.shortname}</p>
                    </div>
                  </>
                )}
              </div>
              {loaded ? (
                <div style={{ width: "190px" }}>
                  <div className="skeleton-box">{elem.order_type}</div>
                </div>
              ) : (
                <p
                  className="recomendation__orderType"
                  style={{
                    color: elem.order_type === "SHORT" ? "#CA390C" : "#449C62",
                  }}
                >
                  {elem.order_type}
                </p>
              )}
              {loaded ? (
                <div style={{ width: "226px" }}>
                  <div className="skeleton-box">{elem.order_status}-90%</div>
                </div>
              ) : (
                <p
                  className="recomendation__orderStatus"
                  style={{ color: checkStatus(elem.order_status) }}
                >
                  {elem.order_benefit
                    ? `${elem.order_status} ${elem.order_benefit}`
                    : elem.order_status}
                </p>
              )}
              <p className="recomendation__costs recomendation__costs--enter">
                {elem.enter_cost.map((elem, index) => (
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
                {elem.exit_cost.map((elem, index) => (
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
                  <p className="skeleton-box">{elem.stop_los}</p>
                </div>
              ) : (
                <p className="recomendation__los">{elem.stop_los}</p>
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
      <ul className="recomendation__pagination">
        <Link to={"/recomenation/${page}"}></Link>
      </ul>
    </div>
  );
};
