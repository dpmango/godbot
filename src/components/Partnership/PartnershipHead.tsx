import { Link } from "react-router-dom";

export const PartnershipHead: React.FC<{}> = () => {
  return (
    <div className="partnership__head">
      <p className="partnership__text">Мой счет:</p>
      <p className="partnership__balance">$12 430</p>
      <Link className="partnership__out" to="/payment">
        ВЫВЕСТИ СРЕДСТВА
      </Link>
      <ul className="partnership__list">
        <li className="partnership__item">
          <p>Заработок <br /> с нами</p> <span className="blue">85.05%</span>
        </li>
        <li className="partnership__item">
          <p>Количество сигналов </p>
          <span className="blue">14 789</span>
        </li>
        <li className="partnership__item">
          <p>Проходимость <br /> сигналов</p>
          <span className="blue">98.5%</span>
        </li>
      </ul>
    </div>
  );
};
