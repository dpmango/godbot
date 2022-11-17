import { FC, useState } from 'react';
import { useAppSelector } from '@store/hooks.store';
import './greeting.scss';

interface IGreetingProps {}

export const Greeting: FC<IGreetingProps> = () => {
  const { currentModal } = useAppSelector((state) => state.modalState);

  return (
    <>
      <div className="greeting__bg"></div>
      <div className="greeting__form">
        {currentModal === 'selebrate' ? (
          <div>
            <h3>Поздравляем!</h3>
            <p>
              Вы активировали тариф Pro на 7 дней. Вам доступен весь функционал приложения. Желаем
              успешной торговли
            </p>
            <div>
              <button>НАЧАТЬ</button>
              {/* <button></button> */}
            </div>
          </div>
        ) : (
          ''
        )}
        {currentModal === 'greeting' ? (
          <div>
            <h3>Благодарим за регистрацию!</h3>
            <p>Предлагаем ознакомиться с сервисом чуть подробней с помощью нашего руководства</p>
            <div>
              <button>НАЧАТЬ</button>
              <button>ПРОПУСТИТЬ</button>
              {/* <button></button> */}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
