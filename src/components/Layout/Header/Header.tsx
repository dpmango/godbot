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
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 7.49343C1 6.91806 1.2478 6.37056 1.68007 5.99084L7.18007 1.15947C7.93506 0.496259 9.06494 0.496259 9.81993 1.15947L15.3199 5.99084C15.7522 6.37056 16 6.91806 16 7.49343V14C16 15.1046 15.1046 16 14 16H12.375C11.2704 16 10.375 15.1046 10.375 14V12.2279C10.375 11.1924 9.53553 10.3529 8.5 10.3529V10.3529C7.46447 10.3529 6.625 11.1924 6.625 12.2279V14C6.625 15.1046 5.72957 16 4.625 16H3C1.89543 16 1 15.1046 1 14V7.49343Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
        {/* <ThemeChanger /> */}
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
