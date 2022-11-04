/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from "react-router-dom";
import { LanguageDropdown } from "../Dropdown/LanguageDropdown";
import { MenuDropdown } from "../Dropdown/MenuDropdown";
import { QuestionDropdown } from "../Dropdown/QuestionDropdown";
import { ThemeChanger } from "../UIelems/ThemeChanger";
import { UserCard } from "../UIelems/UserCard";
import { Winrate } from "../UIelems/Winrate";
import { MobileMenu } from "./MobileMenu";
import { useState } from "react";

export const Header: React.FC<{}> = () => {
  const [menu, setMenu] = useState(false);

  return (
    <header className="header">
      <>
        <MobileMenu active={menu} />
      </>
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
                xmlns="http://www.w3.org/2000/svg"
              >
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
          <li className="menu__item">
            <NavLink to="partnership">
              <svg
                width="20"
                height="17"
                viewBox="0 0 27 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9198 13.6998C19.5995 13.4937 20.397 13.375 21.25 13.375C23.7353 13.375 25.75 14.3824 25.75 15.625C25.75 16.8676 23.7353 17.875 21.25 17.875C20.397 17.875 19.5995 17.7563 18.9198 17.5502M18.9198 13.6998C17.7005 12.8235 15.6717 12.25 13.375 12.25C11.0783 12.25 9.04949 12.8235 7.83022 13.6998M18.9198 13.6998C19.6796 14.2458 20.125 14.9094 20.125 15.625C20.125 16.3406 19.6796 17.0042 18.9198 17.5502M18.9198 17.5502C17.7005 18.4265 15.6717 19 13.375 19C11.0783 19 9.04949 18.4265 7.83022 17.5502M7.83022 13.6998C7.15053 13.4937 6.35298 13.375 5.5 13.375C3.01472 13.375 1 14.3824 1 15.625C1 16.8676 3.01472 17.875 5.5 17.875C6.35298 17.875 7.15053 17.7563 7.83022 17.5502M7.83022 13.6998C7.07043 14.2458 6.625 14.9094 6.625 15.625C6.625 16.3406 7.07043 17.0042 7.83022 17.5502M16.75 4.375C16.75 6.23896 15.239 7.75 13.375 7.75C11.511 7.75 10 6.23896 10 4.375C10 2.51104 11.511 1 13.375 1C15.239 1 16.75 2.51104 16.75 4.375ZM23.5 7.75C23.5 8.99264 22.4926 10 21.25 10C20.0074 10 19 8.99264 19 7.75C19 6.50736 20.0074 5.5 21.25 5.5C22.4926 5.5 23.5 6.50736 23.5 7.75ZM7.75 7.75C7.75 8.99264 6.74264 10 5.5 10C4.25736 10 3.25 8.99264 3.25 7.75C3.25 6.50736 4.25736 5.5 5.5 5.5C6.74264 5.5 7.75 6.50736 7.75 7.75Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Партнерская программа</p>
            </NavLink>
          </li>
          <li className="menu__item disabled">
            <NavLink to="learning_center">
              <svg
                width="18"
                height="17"
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 17V2.28571L7.42857 8.71429L12.5714 1L17.7143 8.71429L24.1429 2.28571V17C24.1429 18.1046 23.2474 19 22.1429 19H3C1.89543 19 1 18.1046 1 17Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Обучающий курс</p>
            </NavLink>
          </li>
          <li className="menu__item disabled">
            <NavLink to="presale">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L1.27735 0.583975C1.12392 0.481689 0.92665 0.472153 0.764071 0.559163C0.601492 0.646172 0.5 0.815602 0.5 1L1 1ZM4 3L3.72265 3.41603C3.8906 3.52799 4.1094 3.52799 4.27735 3.41603L4 3ZM7 1L7.27735 0.583975C7.1094 0.472008 6.8906 0.472008 6.72265 0.583975L7 1ZM10 3L9.72265 3.41603C9.8906 3.52799 10.1094 3.52799 10.2774 3.41603L10 3ZM13 1H13.5C13.5 0.815602 13.3985 0.646172 13.2359 0.559163C13.0733 0.472153 12.8761 0.481689 12.7226 0.583975L13 1ZM17 9H17.5C17.5 8.72386 17.2761 8.5 17 8.5V9ZM5 5.5C4.72386 5.5 4.5 5.72386 4.5 6C4.5 6.27614 4.72386 6.5 5 6.5V5.5ZM9 6.5C9.27614 6.5 9.5 6.27614 9.5 6C9.5 5.72386 9.27614 5.5 9 5.5V6.5ZM5 9.5C4.72386 9.5 4.5 9.72386 4.5 10C4.5 10.2761 4.72386 10.5 5 10.5V9.5ZM9 10.5C9.27614 10.5 9.5 10.2761 9.5 10C9.5 9.72386 9.27614 9.5 9 9.5V10.5ZM5 13.5C4.72386 13.5 4.5 13.7239 4.5 14C4.5 14.2761 4.72386 14.5 5 14.5V13.5ZM9 14.5C9.27614 14.5 9.5 14.2761 9.5 14C9.5 13.7239 9.27614 13.5 9 13.5V14.5ZM0.72265 1.41603L3.72265 3.41603L4.27735 2.58397L1.27735 0.583975L0.72265 1.41603ZM4.27735 3.41603L7.27735 1.41603L6.72265 0.583975L3.72265 2.58397L4.27735 3.41603ZM6.72265 1.41603L9.72265 3.41603L10.2774 2.58397L7.27735 0.583975L6.72265 1.41603ZM10.2774 3.41603L13.2774 1.41603L12.7226 0.583975L9.72265 2.58397L10.2774 3.41603ZM13 16.5H5V17.5H13V16.5ZM1.5 13V1H0.5V13H1.5ZM12.5 1V9H13.5V1H12.5ZM12.5 9V17H13.5V9H12.5ZM13 9.5H17V8.5H13V9.5ZM16.5 9V13H17.5V9H16.5ZM5 6.5H9V5.5H5V6.5ZM5 10.5H9V9.5H5V10.5ZM5 14.5H9V13.5H5V14.5ZM16.5 13C16.5 14.933 14.933 16.5 13 16.5V17.5C15.4853 17.5 17.5 15.4853 17.5 13H16.5ZM5 16.5C3.067 16.5 1.5 14.933 1.5 13H0.5C0.5 15.4853 2.51472 17.5 5 17.5V16.5Z"
                  fill="black"
                />
              </svg>

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
          className={menu ? "mobile__menu active" : "mobile__menu"}
          onClick={() => setMenu(!menu)}
        >
          <span></span>
        </button>
      </nav>
    </header>
  );
};
