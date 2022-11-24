import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon } from '@ui';
import { useAppSelector } from '@store';

import { LanguageDropdown } from '@c/Layout/Dropdown';
import { Socials, ThemeChanger, UserCard } from '@c/Layout/Atom';

import './mobile.scss';

export interface IMobileMenuProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const MobileMenu: React.FC<IMobileMenuProps> = ({ active, setActive }) => {
  const { userData, isProUser } = useAppSelector((state) => state.userState);

  const handleClick = () => {
    setActive(false);
  };

  return (
    <div className={active ? 'mobile active' : 'mobile'}>
      <div className="mobile__head">
        <LanguageDropdown />
        <ThemeChanger />
      </div>
      <UserCard />
      <ul className="mobile__list">
        <li className="mobile__item" onClick={handleClick}>
          <Link to={'/partnership'}>
            <SvgIcon name="people" />
            ПАРТНЕРСКАЯ ПРОГРАММА
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={'*'}>
            <SvgIcon name="crown" />
            ОБУЧАЮЩИЙ ЦЕНТР
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={'*'}>
            <SvgIcon name="ticket" />
            ПРЕСЕЙЛЫ
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={'*'}>
            <SvgIcon name="lightbulb" />
            Предложить идею
          </Link>
        </li>
        {/* <li className="mobile__item disabled">
          <Link to={'*'}>
            <SvgIcon name="stickynote" />
            Справочный центр
          </Link>
        </li> */}
        <li className="mobile__item disabled">
          {/* @ts-ignore */}
          <a href="#" onClick={() => window._teletypeWidget.show()}>
            <SvgIcon name="conversation" />
            Написать нам
          </a>
        </li>
        {/* <li className="mobile__item disabled">
          <Link to={'*'}>
            <SvgIcon name="gift" />
            Что нового
          </Link>
        </li> */}
      </ul>

      <ul className="mobile__services">
        <li>
          <Link to={'/'}>Сменить тариф</Link>
        </li>
        <li>
          <Link to={'/'}>Привязать Telegram-бота</Link>
        </li>
        <li className={cns(isProUser && 'pro')}>
          <Link to="https://t.me/+fQvg8JT7oUVhZDZi" target="_blank">
            Перейти в Telegram-чат
          </Link>
        </li>
      </ul>
      <Socials />
      <p className="mobile__conf">
        Конфиденциальность • Условия сервиса • <br /> Политика использования cookies
      </p>
    </div>
  );
};
