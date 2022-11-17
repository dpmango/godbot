import Cookies from 'js-cookie';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import './authorization.scss';

export const AuthorizationForm: React.FC<{}> = () => {
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    localStorage.setItem('email', value);
    e.preventDefault();
    const resp = await fetch(`${process.env.REACT_APP_API_URL}auth/login/`, {
      method: 'POST',
      body: JSON.stringify({
        email: value,
      }),
      headers: {
        'Content-Type': 'application/json' as string,
        'X-CSRFToken': Cookies.get('csrftoken') as string,
      },
    });
    if (resp.ok) {
      navigate('/auth/validation');
    } else {
      console.log('error');
    }
  };

  return (
    <form className="authorization__form" action="" onSubmit={handleSubmit}>
      <Helmet>
        <title>Godbot | Authorization</title>
      </Helmet>
      <h2 className="authorization__title">Вход / Регистрация</h2>
      <label className="authorization__label" htmlFor="">
        <p>Введите ваш Email для получения кода авторизации</p>
        <input
          value={value}
          className="authorization__input"
          placeholder="Введите ваш Email"
          type="text"
          onChange={handleChange}
        />
      </label>
      <button className="authorization__submit">Войти</button>
    </form>
  );
};
