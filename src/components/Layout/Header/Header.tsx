import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { LanguageDropdown, QuestionDropdown } from '@c/Layout/Header';
import { UserCard } from '@ui/UserCard';
import { SvgIcon } from '@ui';
import { MobileMenu } from '../MobileMenu';

export const Header: React.FC<{}> = () => {
  const [menu, setMenu] = useState(false);

  return (
    <header className="header">
      <MobileMenu active={menu} setActive={setMenu} />

      <nav className="menu">
        <Link to="/" className="logo">
          <img src="./images/Logo.svg" alt="" />
        </Link>
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink to="/" end>
              <SvgIcon name="home" />
              <p>Главная</p>
            </NavLink>
          </li>
          <li className="menu__item disabled">
            <NavLink to="partnership">
              <SvgIcon name="people" />
              <p>Партнерская программа</p>
            </NavLink>
          </li>
          <li className="menu__item disabled">
            <NavLink to="learning_center">
              <SvgIcon name="crown" />
              <p>Обучающий курс</p>
            </NavLink>
          </li>
          <li className="menu__item disabled">
            <NavLink to="presale">
              <SvgIcon name="ticket" />
              <p>Пресейлы</p>
            </NavLink>
          </li>
        </ul>
        {/* <MenuDropdown /> */}
        {/* <Winrate /> */}
        <QuestionDropdown />
        <LanguageDropdown />
        <UserCard />
        <button
          className={menu ? 'mobile__menu active' : 'mobile__menu'}
          onClick={() => setMenu(!menu)}>
          <span></span>
        </button>
      </nav>
    </header>
  );
};
