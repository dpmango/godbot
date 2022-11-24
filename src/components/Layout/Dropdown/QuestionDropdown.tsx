import { useRef } from 'react';
import cns from 'classnames';

import { useDropdown, useClickOutside } from '@hooks';
import { SvgIcon } from '@ui';

export const QuestionDropdown: React.FC<{}> = () => {
  const { handleStateChange, menuState } = useDropdown();
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => handleStateChange(false));

  return (
    <div className="question" ref={wrapperRef}>
      <button
        onClick={handleStateChange}
        className={cns('question__button', menuState && '_active')}>
        <SvgIcon name="question-circle" />
        <div className="question__toggle">
          <SvgIcon name="chevron" />
        </div>
      </button>
      <ul className={cns('question__list', menuState && '_active')}>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <div className="question__btn-ico">
              <SvgIcon name="lightbulb" />
            </div>
            Предложить идею
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <div className="question__btn-ico">
              <SvgIcon name="stickynote" />
            </div>
            Справочный центр
          </button>
        </li>
        <li className="question__item" onClick={handleStateChange}>
          {/* @ts-ignore */}
          <button className="question__btn" onClick={() => window._teletypeWidget?.show()}>
            <div className="question__btn-ico">
              <SvgIcon name="conversation" />
            </div>
            Написать нам
          </button>
        </li>
        {/* <li className="question__item" onClick={handleStateChange}>
          <button className="question__btn">
            <div className="question__btn-ico"><SvgIcon name="gift" /></div>
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
