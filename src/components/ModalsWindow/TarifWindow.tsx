import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { InfoCircle } from "../UIelems/InfoCircle";
import "./modals.scss";
import { Helmet } from "react-helmet";

export const TarifWindow: React.FC<{}> = () => {
  const [data, setData] = useState<any>([]);
  const [currentBlock, setCurrentBlock] = useState(0);
  const { pathname } = useLocation();

  const getTarifs = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}get_tariffs/`);
    const data = await resp.json();
    setData(data.data);
  };

  useEffect(() => {
    getTarifs();
  }, []);

  if (!data.length) return <div></div>;

  return (
    <div className="tarif">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Godbot | Tarifs</title>
      </Helmet>
      <Link
        to={pathname.slice(0, pathname.length - 7)}
        className="tarif__close"
      >
        &times;
      </Link>
      <h4 className="tarif__title">Тарифы</h4>
      <div className="tarif__header">
        {[
          "1 месяц - без подарка",
          "6 месяцев + 1 в подарок",
          "12 месяцев + 4 в подарок",
        ].map((elem, index) => (
          <button
            onClick={() => setCurrentBlock(index)}
            className={index === currentBlock ? "active" : ""}
          >
            {elem}
          </button>
        ))}
      </div>
      <ul className="tarif__inner">
        <li className="tarif__card">
          <div className="tarif__service">Скидка 20% до 10.11.2022</div>
          <div className="tarif__wrapper">
            <div className="tarif__head">
              <h5>{data[2]?.title}</h5>
            </div>
            <p className="tarif__cost">
              <strong>99$</strong>
              {data[2]?.plans[currentBlock].cost}$ <span>/за 7 дней</span>
            </p>
            <Link className="tarif__link" to={"/payment"}>
              Оплатить
            </Link>
            <ul className="tarif__list">
              <li>График 15-минутного прогноза BTC</li>
              <li>Сигналы на покупку и продажу активов от ИИ</li>
              <li>Частичный доступ к обучающему курсу</li>
              <li>Подключение Telegram-бота (скоро)</li>
              <li>Служба поддержки 24/7</li>
            </ul>
          </div>
        </li>
        <li className="tarif__card">
          <div className="tarif__service">Скидка 20% до 10.11.2022</div>
          <div className="tarif__wrapper">
            <div className="tarif__head">
              <h5>{data[1]?.title}</h5>
            </div>
            <p className="tarif__cost">
              <strong>999$</strong>
              {data[1]?.plans[currentBlock].cost}$ <span>/за 7 дней</span>
            </p>
            <Link className="tarif__link" to={"/payment"}>
              Оплатить
            </Link>
            <ul className="tarif__list">
              <li>График 15-минутного прогноза BTC</li>
              <li>Сигналы на покупку и продажу активов от ИИ</li>
              <li>Частичный доступ к обучающему курсу</li>
              <li>Подключение Telegram-бота (скоро)</li>
              <li>Служба поддержки 24/7</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};
