import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const AuthorizationValidate: React.FC<{}> = () => {
  const [timer, setTimer] = useState(59);
  let [value, setValue] = useState<string>("");
  const inputsBox = useRef<HTMLDivElement | any>(null);
  const inputsList = inputsBox?.current?.childNodes;

  const handleChange = (e: any, index: number) => {
    if (e.target.value !== "") {
      inputsList[index]?.focus();
    }
    inputsList.forEach((elem: HTMLInputElement) => {
      setValue((value += elem.value));
    });
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.key === "Backspace") {
      inputsList[index - 1]?.focus();
    }
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    let validateCode = "";
    inputsList.forEach((elem: HTMLInputElement) => {
      validateCode += elem.value;
    });
    const resp = await fetch("https://dev.godbot.pro/api/auth/verification/", {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") as string,
      },
      body: JSON.stringify({
        code: validateCode.trim(),
      }),
    });

  };

  setTimeout(() => {
    setTimer(timer - 1);
    if (timer === 0) {
      setTimer(59);
    }
  }, 1000);

  return (
    <form
      className="authorization__form validation"
      action=""
      onSubmit={handleSubmit}
    >
      <h2 className="authorization__title">Верификация</h2>
      <label className="authorization__label" htmlFor="">
        Вы получите электронное письмо с кодом подтверждения. Введите его здесь,
        чтобы подтвердить вход
      </label>
      <div className="authorization__wrapper" ref={inputsBox}>
        {[0, 1, 2, 3, 4, 5].map((elem) => (
          <input
            key={elem}
            maxLength={1}
            className="authorization__input validation"
            onKeyUp={(e) => handleBackspace(e, elem)}
            onChange={(e) => handleChange(e, elem + 1)}
            type="text"
          />
        ))}
        <button className="authorization__resend">
          <strong>{timer}s</strong> Отправить снова
        </button>
      </div>
      <label className="authorization__text" htmlFor="">
        Если вы не получили письмо, проверьте спам
      </label>
      <button className="authorization__submit">Подтвердить</button>
      <button className="authorization__return">
        <svg
          width="22"
          height="12"
          viewBox="0 0 22 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 6.7C21.3866 6.7 21.7 6.3866 21.7 6C21.7 5.6134 21.3866 5.3 21 5.3V6.7ZM0.505026 5.50503C0.231659 5.77839 0.231659 6.22161 0.505026 6.49497L4.9598 10.9497C5.23316 11.2231 5.67638 11.2231 5.94975 10.9497C6.22311 10.6764 6.22311 10.2332 5.94975 9.9598L1.98995 6L5.94975 2.0402C6.22311 1.76684 6.22311 1.32362 5.94975 1.05025C5.67638 0.776886 5.23316 0.776886 4.9598 1.05025L0.505026 5.50503ZM21 5.3L1 5.3V6.7L21 6.7V5.3Z"
            fill="black"
          />
        </svg>
        Назад
      </button>
    </form>
  );
};
