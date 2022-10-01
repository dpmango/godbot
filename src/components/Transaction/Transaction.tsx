import { lightFormat } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { getRecData } from "../../reducers/recDataSlice.reducer";

export const Transaction: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.recState);
  const { userData } = useAppSelector((state) => state.userState);

  useEffect(() => {
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

  return (
    <div className="recomendation">
      {userData?.rank === 'New' ? <div className="table__lock">
        <div>
          <img src="./images/Lock.svg" alt="Lock" />
          <p>Для отображения графика нейронной сети необходимо выбрать тариф</p>
          <Link className="table__link" to={"/payment"}>
            ВЫБРАТЬ ТАРИФ
          </Link>
        </div>
      </div>: ''}
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
        {data.map((elem, index) => (
          <li key={index} className="recomendation__item">
            <p className="recomendation__signal">{elem.signal}</p>
            <div className="recomendation__wrapper">
              <img
                src={`./images/${elem.icon}`}
                alt={`Coin name ${elem.name}`}
              />
              <div>
                <h6>{elem.name} </h6>
                <p>{elem.shortname}</p>
              </div>
            </div>
            <p
              className="recomendation__orderType"
              style={{
                color: elem.order_type === "SHORT" ? "#CA390C" : "#449C62",
              }}
            >
              {elem.order_type}
            </p>
            <p
              className="recomendation__orderStatus"
              style={{ color: checkStatus(elem.order_status) }}
            >
              {elem.order_benefit
                ? `${elem.order_status} ${elem.order_benefit}`
                : elem.order_status}
            </p>
            <p className="recomendation__costs recomendation__costs--enter">
              {elem.enter_cost.map((elem, index) => (
                <span key={index}>${elem}</span>
              ))}
            </p>
            <p className="recomendation__costs">
              {elem.exit_cost.map((elem, index) => (
                <span key={index}>${elem}</span>
              ))}
            </p>
            <p className="recomendation__los">{elem.stop_los}</p>
            <p className="recomendation__risk">{elem.risk}%</p>
          </li>
        ))}
      </ul>
      <ul className="recomendation__pagination">
        <Link to={"/recomenation/${page}"}></Link>
      </ul>
    </div>
  );
};
