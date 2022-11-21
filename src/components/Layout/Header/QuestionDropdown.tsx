import { useDropdown } from '@hooks';
import { SvgIcon } from '@ui';

export const QuestionDropdown: React.FC<{}> = () => {
  const { handleStateChange, menuState } = useDropdown();

  return (
    <div className="question">
      <button
        onClick={handleStateChange}
        className={menuState ? 'question__button _active' : 'question__button'}>
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.5273 11C21.5273 16.5228 17.0502 21 11.5273 21C6.0045 21 1.52734 16.5228 1.52734 11C1.52734 5.47715 6.0045 1 11.5273 1C17.0502 1 21.5273 5.47715 21.5273 11Z"
            stroke="#4572EE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0451 13.6136C11.4344 13.6136 11.7125 13.317 11.7125 12.9092V12.7053C11.7125 12.1121 11.972 11.7043 13.01 10.7775C14.3076 9.62821 14.771 8.8126 14.771 7.77455C14.771 6.01358 13.3622 4.67896 11.5086 4.67896C10.0256 4.67896 8.87637 5.45749 8.35735 6.79212C8.32028 6.8848 8.2832 6.99602 8.2832 7.16285C8.2832 7.51504 8.56125 7.81163 8.93198 7.81163C9.19149 7.81163 9.43247 7.6448 9.56222 7.32968C9.91442 6.477 10.6188 5.99505 11.4715 5.99505C12.5095 5.99505 13.2881 6.79212 13.2881 7.86724C13.2881 8.62723 13.01 9.05357 11.8422 10.1472C10.7486 11.1667 10.3593 11.8155 10.3593 12.6682V12.9277C10.3593 13.317 10.6744 13.6136 11.0451 13.6136ZM11.0822 17.3209C11.7125 17.3209 12.25 16.8018 12.25 16.1531C12.25 15.5043 11.7125 14.9853 11.0822 14.9853C10.452 14.9853 9.91442 15.5043 9.91442 16.1531C9.91442 16.8018 10.452 17.3209 11.0822 17.3209Z"
            fill="#4572EE"
          />
        </svg>
      </button>
      <ul className={menuState ? 'question__list _active' : 'question__list'}>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <SvgIcon name="lightbulb" />
            Предложить идею
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <SvgIcon name="stickynote" />
            Справочный центр
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <SvgIcon name="conversation" />
            Написать нам
          </button>
        </li>
        {/* <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <SvgIcon name="gift" />
            Что нового
          </button>
        </li> */}
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
