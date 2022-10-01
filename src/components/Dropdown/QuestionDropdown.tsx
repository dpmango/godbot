import { useDropdown } from "../../hooks/useDropdown";

export const QuestionDropdown: React.FC<{}> = () => {
  const { handleStateChange, menuState } = useDropdown();

  return (
    <div className="question">
      <button
        onClick={handleStateChange}
        className={menuState ? "question__button _active" : "question__button"}
      >
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5273 11C21.5273 16.5228 17.0502 21 11.5273 21C6.0045 21 1.52734 16.5228 1.52734 11C1.52734 5.47715 6.0045 1 11.5273 1C17.0502 1 21.5273 5.47715 21.5273 11Z"
            stroke="url(#paint0_linear_828_2147)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0451 13.6136C11.4344 13.6136 11.7125 13.317 11.7125 12.9092V12.7053C11.7125 12.1121 11.972 11.7043 13.01 10.7775C14.3076 9.62821 14.771 8.8126 14.771 7.77455C14.771 6.01358 13.3622 4.67896 11.5086 4.67896C10.0256 4.67896 8.87637 5.45749 8.35735 6.79212C8.32028 6.8848 8.2832 6.99602 8.2832 7.16285C8.2832 7.51504 8.56125 7.81163 8.93198 7.81163C9.19149 7.81163 9.43247 7.6448 9.56222 7.32968C9.91442 6.477 10.6188 5.99505 11.4715 5.99505C12.5095 5.99505 13.2881 6.79212 13.2881 7.86724C13.2881 8.62723 13.01 9.05357 11.8422 10.1472C10.7486 11.1667 10.3593 11.8155 10.3593 12.6682V12.9277C10.3593 13.317 10.6744 13.6136 11.0451 13.6136ZM11.0822 17.3209C11.7125 17.3209 12.25 16.8018 12.25 16.1531C12.25 15.5043 11.7125 14.9853 11.0822 14.9853C10.452 14.9853 9.91442 15.5043 9.91442 16.1531C9.91442 16.8018 10.452 17.3209 11.0822 17.3209Z"
            fill="url(#paint1_linear_828_2147)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_828_2147"
              x1="1.52735"
              y1="24.3508"
              x2="19.7665"
              y2="26.1554"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1F3A99" />
              <stop offset="1" stopColor="#88019E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_828_2147"
              x1="8.2832"
              y1="19.4389"
              x2="14.2423"
              y2="19.7415"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1F3A99" />
              <stop offset="1" stopColor="#88019E" />
            </linearGradient>
          </defs>
        </svg>
      </button>
      <ul className={menuState ? "question__list _active" : "question__list"}>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <svg
              width="16"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.83871 13.1935V14.0645C8.83871 15.5076 7.66887 16.6774 6.22581 16.6774V16.6774C4.78274 16.6774 3.6129 15.5076 3.6129 14.0645V13.1935M8.83871 13.1935C8.83871 13.1935 9.13245 12.2161 9.70968 10.5806C10.2159 9.14624 11.4516 9.11194 11.4516 6.22581C11.4516 3.33967 9.11194 1 6.22581 1C3.33967 1 1 3.33967 1 6.22581C1 9.11194 2.23567 9.14624 2.74194 10.5806C3.31916 12.2161 3.6129 13.1935 3.6129 13.1935M8.83871 13.1935H6.22581M3.6129 13.1935H6.22581M6.22581 13.1935V9.70968"
                stroke="#262628"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Предложить идею
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.96774 14.9355H4C2.34315 14.9355 1 13.5923 1 11.9355V4C1 2.34315 2.34315 1 4 1H11.9355C13.5923 1 14.9355 2.34315 14.9355 4V7.96774M7.96774 14.9355V10.9677C7.96774 9.31089 9.31089 7.96774 10.9677 7.96774H14.9355M7.96774 14.9355L14.9355 7.96774"
                stroke="#262628"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Справочный центр
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.48387 10.5806H9.45161C10.5562 10.5806 11.4516 9.68521 11.4516 8.58064V4.48387M4.48387 10.5806H4.44133C3.9109 10.5806 3.40219 10.7914 3.02712 11.1664L1 13.1935V3C1 1.89543 1.89543 1 3 1H9.45161C10.5562 1 11.4516 1.89543 11.4516 3V4.48387M4.48387 10.5806V11.1935C4.48387 12.2981 5.3793 13.1935 6.48387 13.1935H11.4942C12.0246 13.1935 12.5333 13.4043 12.9084 13.7793L14.9355 15.8065V6.48387C14.9355 5.3793 14.0401 4.48387 12.9355 4.48387H11.4516M3.6129 4.48387H8.83871M3.6129 7.09677H7.09677"
                stroke="#262628"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Написать нам
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <svg
              width="16"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.74194 9.70968V9.70968C1.77989 9.70968 1 8.92979 1 7.96774V7.35484C1 6.25027 1.89543 5.35484 3 5.35484H8.83871M2.74194 9.70968V14.6774C2.74194 15.782 3.63737 16.6774 4.74194 16.6774H8.83871M2.74194 9.70968H14.9355M14.9355 9.70968V9.70968C15.8975 9.70968 16.6774 8.92979 16.6774 7.96774V7.35484C16.6774 6.25027 15.782 5.35484 14.6774 5.35484H8.83871M14.9355 9.70968V14.6774C14.9355 15.782 14.0401 16.6774 12.9355 16.6774H8.83871M8.83871 16.6774V5.35484M8.83871 5.35484V3.17742M8.83871 3.17742C8.83871 1.97486 7.86385 1 6.66129 1C5.45873 1 4.48387 1.97486 4.48387 3.17742C4.48387 4.37997 5.45873 5.35484 6.66129 5.35484M8.83871 3.17742C8.83871 1.97486 9.81357 1 11.0161 1C12.2187 1 13.1935 1.97486 13.1935 3.17742C13.1935 4.37997 12.2187 5.35484 11.0161 5.35484"
                stroke="#262628"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Что нового
          </button>
        </li>
        <li className="question__documents">
          <p className="question__title">Документы</p>
          <div>
            <a href="#">• Отказ от ответственности</a>
            <a href="#">• Оферта</a>
          </div>
          <ul>
            <li>Конфиденциальность</li>
            <li>• Условия сервиса</li>
            <li>• Политика использования cookies</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
