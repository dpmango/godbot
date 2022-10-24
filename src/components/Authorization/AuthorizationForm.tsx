export const AuthorizationForm: React.FC<{}> = () => {
  
  return (
    <form className="authorization__form" action="">
      <h2 className="authorization__title">Вход / Регистрация</h2>
      <label className="authorization__label" htmlFor="">
        Введите ваш Email для получения кода авторизации
        <input
          className="authorization__input"
          placeholder="Введите ваш Email"
          type="text"
        />
      </label>
      <button className="authorization__submit">Войти</button>
    </form>
  );
};
