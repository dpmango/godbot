import React from "react";
import { Link, useParams, useRoutes } from "react-router-dom";
import { InfoCircle } from "../UIelems/InfoCircle";
import "./modals.scss";
import { Helmet } from "react-helmet";

export const TarifWindow: React.FC<{}> = () => {

  return (
    <div className="tarif">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Godbot | Tarifs</title>
      </Helmet>
      <Link to="/" className="tarif__close">
        &times;
      </Link>
      <h4 className="tarif__title">Тарифы</h4>
      <ul className="tarif__inner">
        <li className="tarif__card">
          <div className="tarif__wrapper">
            <div className="tarif__head">
              <h5>НОВИЧОК</h5>
              <p className="tarif__info">
                1777/3000 <span>куплено</span>
              </p>
            </div>
            <ul className="tarif__list">
              <li>Доступ к обучающего курса </li>
              <li>Доступ к графику минутного прогноза ИИ</li>
              <li>Доступ к части сигналов на покупку/продажу от ИИ</li>
            </ul>
            <div className="tarif__bottom sale">
              <InfoCircle title="По постоплате, при условии получения прибыли более 3% в неделю" />
              <span className="tarif__sale">СКИДКА 20%</span>
              <p className="tarif__price">
                <span>$25 в неделю</span>
                $20 в неделю
              </p>
            </div>
          </div>
          <Link to={"/payment"} className="tarif__link active">
            АКТИВНЫЙ ТАРИФ
          </Link>
        </li>
        <li className="tarif__card">
          <div className="tarif__wrapper">
            <div className="tarif__head">
              <h5>ТРЕЙДЕР</h5>
              <p className="tarif__info saled">
                места <span>распроданы</span>
              </p>
            </div>
            <ul className="tarif__list">
              <li>Доступ к обучающего курса </li>
              <li>
                Доступ к прогнозам ИИ с ТФ: 1 мин, 5 мин, 1 час, 1 день, 1
                неделя, 1 месяц
              </li>
              <li>Доступ ко всем сигналам на покупку/продажу от ИИ</li>
              <li>Доступ криптопортфелю, сформированному ИИ</li>
              <li>Доступ в закрытый чат трейдеров</li>
            </ul>
            <div className="tarif__bottom">
              <p className="tarif__price">$999 в месяц</p>
              <button className="tarif__promo">Ввести промокод</button>
            </div>
          </div>
          <Link to={"/payment"} className="tarif__link">
            ОПЛАТИТЬ
          </Link>
        </li>
        <li className="tarif__card">
          <div className="tarif__wrapper">
            <div className="tarif__head">
              <h5>ИНВЕСТОР</h5>
            </div>
            <ul className="tarif__list">
              <li>Доступ к обучающему курсу </li>
              <li>Доступ в чат инвесторов</li>
              <li>
                Возможность получить прогноз по любому интересующему активу:
                валютам, акциям и т.д.
              </li>
            </ul>
            <div className="tarif__bottom">
              <p className="tarif__price">Индивидуально</p>
            </div>
          </div>
          <Link to={"/payment"} className="tarif__link">
            ОСТАВИТЬ ЗАЯВКУ
          </Link>
        </li>
      </ul>
    </div>
  );
};
