import { FC } from 'react';

interface IPartnershipBonusProps {}

export const PartnershipBonus: FC<IPartnershipBonusProps> = () => {
  return (
    <div className="partnership-bonus block">
      <div className="partnership-flex">
        <h3 className="partnership__title">
          Повышай ранг и получай бонусы
          <p>
            Ваши оплаты за месяц:
            <span>6000$</span>
          </p>
        </h3>
        <button className="partnership-bonus__more">ПОБРОБНЕЕ О БОНУСАХ</button>
      </div>
      <ul className="partnership-bonus__list">
        <li className="partnership-bonus__card">
          <p>1 ранг</p>
          <strong>оплат {'>'} 5k</strong>
        </li>
        <li className="partnership-bonus__card">
          <p>2 ранг</p>
          <strong>оплат {'>'} 20k</strong>
        </li>
        <li className="partnership-bonus__card">
          <p>3 ранг</p>
          <strong>оплат {'>'} 50k</strong>
        </li>
        <li className="partnership-bonus__card">
          <p>4 ранг</p>
          <strong>оплат {'>'} 100k</strong>
        </li>
        <li className="partnership-bonus__card">
          <p>5 ранг</p>
          <strong>оплат {'>'} 200k</strong>
        </li>
      </ul>
    </div>
  );
};
