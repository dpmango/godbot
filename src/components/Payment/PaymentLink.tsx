import { useState } from 'react';
import { useDropdown } from '@hooks';

export const PaymentLink: React.FC<{}> = () => {
  const [currentLink, setCurrentLink] = useState<string | null>('TRC20');
  const { menuState, handleStateChange } = useDropdown();

  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    setCurrentLink((e.target as HTMLElement).textContent);
    handleStateChange();
  };

  return (
    <div className="payment__block">
      <div className={menuState ? 'payment__select active' : 'payment__select'}>
        <p className="payment__label">Выберите сеть:</p>
        <button className="payment__select-button" onClick={handleStateChange}>
          {currentLink}
        </button>
        <ul className="payment__select-list">
          {['TRC20', 'TRC19'].map((elem, idx) => (
            <li key={idx} onClick={handleClick}>
              {elem}
            </li>
          ))}
        </ul>
      </div>
      <div className="payment__sum">
        <div className="payment__wrapper">
          <p>Итого к оплате:</p>
          <div>
            0,0023513 <span>USDT</span>
            <img src="./images/usdt.svg" alt="" />
          </div>
        </div>
      </div>
      <p className="payment__text">
        Ваш платеж будет подтвержден после 3 подтверждений от сети blockchain. Обычно это происходит
        в течении 15-20 минут. Затем статус платежа изменится на “Оплачен”.
      </p>
      <p className="payment__timer">Платеж будет отменен через: 20:23</p>
    </div>
  );
};
