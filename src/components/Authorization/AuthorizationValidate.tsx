import Cookies from 'js-cookie';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import './authorization.scss';

export interface IAuthorization {
  sendEmail: () => Promise<Response>;
}

export const AuthorizationValidate: React.FC<IAuthorization> = ({ sendEmail }) => {
  const [timer, setTimer] = useState(3);
  let [value, setValue] = useState<string>('');
  const validInput: any = useRef();
  const inputsBox = useRef<HTMLDivElement | any>(null);
  const inputsList = inputsBox?.current?.childNodes;
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    validInput.current?.focus();
    (e.target as HTMLElement).classList.add('cursor-active');
  };

  const handleTest: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isNaN(+(e.nativeEvent as any).data)) {
      const validationCode = e.target.value.split('');
      const inputParent = inputsList[validationCode.length];
      inputsList.forEach((elem: HTMLInputElement | any, index: number) => {
        elem.classList.remove('cursor-active');
        if (inputParent.childNodes[0].value === '') {
          inputParent.classList.add('cursor-active');
        }
        elem.childNodes[0].value = validationCode[index] || '';
      });
      setValue(e.target.value);
    }
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}auth/verification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' as string,
          'X-CSRFToken': Cookies.get('csrftoken') as string,
        },
        body: JSON.stringify({ code: value }),
      });
      if (resp.ok) {
        window.location = '/' as Location | (string & Location);
        Cookies.set('auth', Date.now().toString(), { expires: 7 });
      }
    } catch (error) {}
  };

  const handleTimer = () => {
    setTimer(59);
    const resp = sendEmail();
  };

  setTimeout(() => {
    if (timer) {
      setTimer(timer - 1);
    }
  }, 1000);

  return (
    <form className="authorization__form validation" action="" onSubmit={handleSubmit}>
      <Helmet>
        <title>Godbot | Validation</title>
      </Helmet>
      <input
        className="invisible"
        maxLength={6}
        value={value}
        autoComplete="off"
        ref={validInput}
        onChange={handleTest}
        type="text"
      />
      <h2 className="authorization__title">Верификация</h2>
      <label className="authorization__label" htmlFor="">
        Вы получите электронное письмо с кодом подтверждения. Введите его здесь, чтобы подтвердить
        вход
      </label>
      <div className="authorization__wrapper" ref={inputsBox}>
        {[0, 1, 2, 3, 4, 5].map((elem, idx) => (
          <div className="authorization__window" key={idx}>
            <input
              key={elem}
              maxLength={1}
              className="authorization__input validation"
              onClick={handleClick}
              type="text"
            />
          </div>
        ))}
        <button
          type="button"
          className={
            timer ? 'authorization__resend onMobile disabled' : 'authorization__resend onMobile'
          }
          onClick={handleTimer}>
          {timer ? <strong>{timer}s</strong> : ''} Отправить снова
        </button>
      </div>
      <button
        type="button"
        className={timer ? 'authorization__resend disabled' : 'authorization__resend'}
        onClick={handleTimer}>
        {timer ? <strong>{timer}s</strong> : ''} Отправить снова
      </button>
      <label className="authorization__text" htmlFor="">
        Если вы не получили письмо, проверьте спам
      </label>
      <button className="authorization__submit">Подтвердить</button>
      <button className="authorization__return" onClick={() => navigate('/auth/registration')}>
        <svg
          width="22"
          height="12"
          viewBox="0 0 22 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 6.7C21.3866 6.7 21.7 6.3866 21.7 6C21.7 5.6134 21.3866 5.3 21 5.3V6.7ZM0.505026 5.50503C0.231659 5.77839 0.231659 6.22161 0.505026 6.49497L4.9598 10.9497C5.23316 11.2231 5.67638 11.2231 5.94975 10.9497C6.22311 10.6764 6.22311 10.2332 5.94975 9.9598L1.98995 6L5.94975 2.0402C6.22311 1.76684 6.22311 1.32362 5.94975 1.05025C5.67638 0.776886 5.23316 0.776886 4.9598 1.05025L0.505026 5.50503ZM21 5.3L1 5.3V6.7L21 6.7V5.3Z"
            fill="white"
          />
        </svg>
        Назад
      </button>
    </form>
  );
};
