import React from "react";
import { Link } from "react-router-dom";
import { LanguageDropdown } from "../Dropdown/LanguageDropdown";
import { ThemeChanger } from "../UIelems/ThemeChanger";
import { UserCard } from "../UIelems/UserCard";
import "./mobile.scss";

export interface IMobileMenuProps {
  active: boolean;
}

export const MobileMenu: React.FC<IMobileMenuProps> = ({ active }) => {
  return (
    <div className={active ? "mobile active" : "mobile"}>
      <div className="mobile__head">
        <LanguageDropdown />
        <ThemeChanger />
      </div>
      <UserCard />
      <ul className="mobile__list">
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 27 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9198 13.6998C19.5995 13.4937 20.397 13.375 21.25 13.375C23.7353 13.375 25.75 14.3824 25.75 15.625C25.75 16.8676 23.7353 17.875 21.25 17.875C20.397 17.875 19.5995 17.7563 18.9198 17.5502M18.9198 13.6998C17.7005 12.8235 15.6717 12.25 13.375 12.25C11.0783 12.25 9.04949 12.8235 7.83022 13.6998M18.9198 13.6998C19.6796 14.2458 20.125 14.9094 20.125 15.625C20.125 16.3406 19.6796 17.0042 18.9198 17.5502M18.9198 17.5502C17.7005 18.4265 15.6717 19 13.375 19C11.0783 19 9.04949 18.4265 7.83022 17.5502M7.83022 13.6998C7.15053 13.4937 6.35298 13.375 5.5 13.375C3.01472 13.375 1 14.3824 1 15.625C1 16.8676 3.01472 17.875 5.5 17.875C6.35298 17.875 7.15053 17.7563 7.83022 17.5502M7.83022 13.6998C7.07043 14.2458 6.625 14.9094 6.625 15.625C6.625 16.3406 7.07043 17.0042 7.83022 17.5502M16.75 4.375C16.75 6.23896 15.239 7.75 13.375 7.75C11.511 7.75 10 6.23896 10 4.375C10 2.51104 11.511 1 13.375 1C15.239 1 16.75 2.51104 16.75 4.375ZM23.5 7.75C23.5 8.99264 22.4926 10 21.25 10C20.0074 10 19 8.99264 19 7.75C19 6.50736 20.0074 5.5 21.25 5.5C22.4926 5.5 23.5 6.50736 23.5 7.75ZM7.75 7.75C7.75 8.99264 6.74264 10 5.5 10C4.25736 10 3.25 8.99264 3.25 7.75C3.25 6.50736 4.25736 5.5 5.5 5.5C6.74264 5.5 7.75 6.50736 7.75 7.75Z"
                stroke="#4572EE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ПАРТНЕРСКАЯ ПРОГРАММА
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 25 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 17V2.28571L7.42857 8.71429L12.5714 1L17.7143 8.71429L24.1429 2.28571V17C24.1429 18.1046 23.2474 19 22.1429 19H3C1.89543 19 1 18.1046 1 17Z"
                stroke="#4572EE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            ОБУЧАЮЩИЙ ЦЕНТР
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M1 1L1.27735 0.583975C1.12392 0.481689 0.92665 0.472153 0.764071 0.559163C0.601492 0.646172 0.5 0.815602 0.5 1L1 1ZM4 3L3.72265 3.41603C3.8906 3.52799 4.1094 3.52799 4.27735 3.41603L4 3ZM7 1L7.27735 0.583975C7.1094 0.472008 6.8906 0.472008 6.72265 0.583975L7 1ZM10 3L9.72265 3.41603C9.8906 3.52799 10.1094 3.52799 10.2774 3.41603L10 3ZM13 1H13.5C13.5 0.815602 13.3985 0.646172 13.2359 0.559163C13.0733 0.472153 12.8761 0.481689 12.7226 0.583975L13 1ZM17 9H17.5C17.5 8.72386 17.2761 8.5 17 8.5V9ZM5 5.5C4.72386 5.5 4.5 5.72386 4.5 6C4.5 6.27614 4.72386 6.5 5 6.5V5.5ZM9 6.5C9.27614 6.5 9.5 6.27614 9.5 6C9.5 5.72386 9.27614 5.5 9 5.5V6.5ZM5 9.5C4.72386 9.5 4.5 9.72386 4.5 10C4.5 10.2761 4.72386 10.5 5 10.5V9.5ZM9 10.5C9.27614 10.5 9.5 10.2761 9.5 10C9.5 9.72386 9.27614 9.5 9 9.5V10.5ZM5 13.5C4.72386 13.5 4.5 13.7239 4.5 14C4.5 14.2761 4.72386 14.5 5 14.5V13.5ZM9 14.5C9.27614 14.5 9.5 14.2761 9.5 14C9.5 13.7239 9.27614 13.5 9 13.5V14.5ZM0.72265 1.41603L3.72265 3.41603L4.27735 2.58397L1.27735 0.583975L0.72265 1.41603ZM4.27735 3.41603L7.27735 1.41603L6.72265 0.583975L3.72265 2.58397L4.27735 3.41603ZM6.72265 1.41603L9.72265 3.41603L10.2774 2.58397L7.27735 0.583975L6.72265 1.41603ZM10.2774 3.41603L13.2774 1.41603L12.7226 0.583975L9.72265 2.58397L10.2774 3.41603ZM13 16.5H5V17.5H13V16.5ZM1.5 13V1H0.5V13H1.5ZM12.5 1V9H13.5V1H12.5ZM12.5 9V17H13.5V9H12.5ZM13 9.5H17V8.5H13V9.5ZM16.5 9V13H17.5V9H16.5ZM5 6.5H9V5.5H5V6.5ZM5 10.5H9V9.5H5V10.5ZM5 14.5H9V13.5H5V14.5ZM16.5 13C16.5 14.933 14.933 16.5 13 16.5V17.5C15.4853 17.5 17.5 15.4853 17.5 13H16.5ZM5 16.5C3.067 16.5 1.5 14.933 1.5 13H0.5C0.5 15.4853 2.51472 17.5 5 17.5V16.5Z"
                fill="#4572EE"
              />
            </svg>
            ПРЕСЕЙЛЫ
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 14 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15V16C10 17.6569 8.65685 19 7 19V19C5.34315 19 4 17.6569 4 16V15M10 15C10 15 10.3373 13.8778 11 12C11.5813 10.3531 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 2.41874 10.3531 3 12C3.66274 13.8778 4 15 4 15M10 15H7M4 15H7M7 15V11"
                stroke="#4572EE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Предложить идею
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.96774 14.9355H4C2.34315 14.9355 1 13.5923 1 11.9355V4C1 2.34315 2.34315 1 4 1H11.9355C13.5923 1 14.9355 2.34315 14.9355 4V7.96774M7.96774 14.9355V10.9677C7.96774 9.31089 9.31089 7.96774 10.9677 7.96774H14.9355M7.96774 14.9355L14.9355 7.96774"
                stroke="#262628"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Справочный центр
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.23529 12.6471H11.7059C12.8105 12.6471 13.7059 11.7516 13.7059 10.6471V5.23529M5.23529 12.6471H5.0049C4.47446 12.6471 3.96576 12.8578 3.59068 13.2328L1 15.8235V3C1 1.89543 1.89543 1 3 1H11.7059C12.8104 1 13.7059 1.89543 13.7059 3V5.23529M5.23529 12.6471V13.8235C5.23529 14.9281 6.13072 15.8235 7.23529 15.8235H13.9363C14.4667 15.8235 14.9754 16.0342 15.3505 16.4093L17.9412 19V7.23529C17.9412 6.13072 17.0457 5.23529 15.9412 5.23529H13.7059M4.17647 5.23529H10.5294M4.17647 8.41177H8.41176"
                stroke="#4572EE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Написать нам
          </Link>
        </li>
        <li className="mobile__item disabled">
          <Link to={"*"}>
            <svg
              width="24"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 11V11C1.89543 11 1 10.1046 1 9V8C1 6.89543 1.89543 6 3 6H10M3 11V17C3 18.1046 3.89543 19 5 19H10M3 11H17M17 11V11C18.1046 11 19 10.1046 19 9V8C19 6.89543 18.1046 6 17 6H10M17 11V17C17 18.1046 16.1046 19 15 19H10M10 19V6M10 6V3.5M10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.88071 6.11929 6 7.5 6M10 3.5C10 2.11929 11.1193 1 12.5 1C13.8807 1 15 2.11929 15 3.5C15 4.88071 13.8807 6 12.5 6"
                stroke="#4572EE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Что нового
          </Link>
        </li>
      </ul>
      <ul className="mobile__rights">
        <p>Документы</p>
        <li>
          <Link to={"/"}>Отказ от ответственности</Link>
        </li>
        <li>
          <Link to={"/"}>Оферта</Link>
        </li>
      </ul>
      <ul className="mobile__services">
        <li>
          <Link to={"/"}>Сменить тариф</Link>
        </li>
        <li>
          <Link to={"/"}>Привязать Telegram-бота</Link>
        </li>
      </ul>
      <ul className="mobile__socials">
        <li>
          <Link to={"/"}>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.49696 11.4844C9.59005 11.4844 12.3765 7.26382 12.3765 3.60484C12.3765 3.48619 12.3739 3.3649 12.3686 3.24625C12.9107 2.85424 13.3785 2.36869 13.75 1.8124C13.2452 2.03701 12.7092 2.1837 12.1603 2.24746C12.7382 1.90106 13.1709 1.35687 13.3782 0.71579C12.8346 1.03798 12.24 1.26526 11.6201 1.38789C11.2023 0.944049 10.6501 0.650174 10.0486 0.551699C9.44709 0.453225 8.82992 0.555637 8.29248 0.8431C7.75504 1.13056 7.32726 1.58707 7.07529 2.14203C6.82332 2.697 6.76118 3.31952 6.89849 3.91334C5.79765 3.8581 4.72071 3.57213 3.73749 3.07398C2.75427 2.57582 1.8867 1.8766 1.19104 1.02165C0.837475 1.63125 0.729282 2.3526 0.888455 3.0391C1.04763 3.7256 1.46222 4.32573 2.04798 4.71754C1.60823 4.70358 1.17811 4.58518 0.793164 4.37213V4.4064C0.79277 5.04613 1.01393 5.66625 1.41905 6.16135C1.82417 6.65646 2.38824 6.99599 3.01539 7.12222C2.60803 7.23368 2.18049 7.24992 1.76585 7.16969C1.94282 7.71985 2.28713 8.20105 2.75075 8.54611C3.21436 8.89117 3.77413 9.08288 4.35194 9.09449C3.37099 9.86504 2.15922 10.283 0.911816 10.281C0.690599 10.2807 0.469599 10.2671 0.25 10.2404C1.51723 11.0534 2.99136 11.4852 4.49696 11.4844Z"
                fill="#55ACEE"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9283 1.58754C11.0679 1.19273 10.1452 0.901855 9.18044 0.735257C9.16287 0.732042 9.14532 0.740077 9.13627 0.756148C9.01761 0.967206 8.88616 1.24255 8.79411 1.45897C7.75648 1.30362 6.72417 1.30362 5.70781 1.45897C5.61574 1.23774 5.47952 0.967206 5.36032 0.756148C5.35127 0.740613 5.33372 0.732578 5.31615 0.735257C4.35195 0.901322 3.42925 1.1922 2.56828 1.58754C2.56082 1.59075 2.55443 1.59612 2.55019 1.60308C0.800033 4.21778 0.32059 6.76821 0.555789 9.28703C0.556853 9.29935 0.563771 9.31114 0.573349 9.31863C1.72806 10.1666 2.84659 10.6814 3.94434 11.0227C3.96191 11.028 3.98053 11.0216 3.99171 11.0071C4.25138 10.6525 4.48286 10.2786 4.68133 9.88538C4.69304 9.86236 4.68186 9.83503 4.65792 9.82593C4.29076 9.68665 3.94115 9.51683 3.60485 9.32399C3.57825 9.30846 3.57612 9.27041 3.60059 9.25219C3.67136 9.19916 3.74215 9.14399 3.80972 9.08827C3.82195 9.0781 3.83899 9.07595 3.85336 9.08238C6.06272 10.0911 8.45462 10.0911 10.6379 9.08238C10.6523 9.07542 10.6693 9.07757 10.6821 9.08774C10.7497 9.14345 10.8204 9.19916 10.8917 9.25219C10.9162 9.27041 10.9146 9.30846 10.888 9.32399C10.5517 9.52058 10.2021 9.68665 9.83441 9.82539C9.81047 9.8345 9.79983 9.86236 9.81154 9.88538C10.0143 10.278 10.2457 10.652 10.5006 11.0066C10.5113 11.0216 10.5304 11.028 10.548 11.0227C11.6511 10.6814 12.7696 10.1666 13.9243 9.31863C13.9344 9.31114 13.9408 9.29988 13.9419 9.28756C14.2234 6.37553 13.4704 3.84601 11.9459 1.60361C11.9421 1.59612 11.9358 1.59075 11.9283 1.58754ZM5.01126 7.75333C4.34609 7.75333 3.79801 7.14266 3.79801 6.39269C3.79801 5.64271 4.33546 5.03204 5.01126 5.03204C5.69237 5.03204 6.23514 5.64807 6.22449 6.39269C6.22449 7.14266 5.68704 7.75333 5.01126 7.75333ZM9.49705 7.75333C8.8319 7.75333 8.28381 7.14266 8.28381 6.39269C8.28381 5.64271 8.82125 5.03204 9.49705 5.03204C10.1782 5.03204 10.7209 5.64807 10.7103 6.39269C10.7103 7.14266 10.1782 7.75333 9.49705 7.75333Z"
                fill="#5F70BE"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.928055 5.56629C4.55193 3.98743 6.96841 2.94654 8.1775 2.44364C11.6297 1.00775 12.347 0.758324 12.8146 0.750088C12.9174 0.748276 13.1474 0.773761 13.2963 0.894614C13.4221 0.996659 13.4567 1.13451 13.4732 1.23126C13.4898 1.32801 13.5104 1.54841 13.494 1.72062C13.3069 3.68625 12.4974 8.45629 12.0856 10.6578C11.9114 11.5894 11.5683 11.9017 11.2361 11.9323C10.5142 11.9987 9.96604 11.4552 9.26685 10.9969C8.17277 10.2797 7.55468 9.83325 6.49268 9.13341C5.26536 8.32463 6.06098 7.8801 6.76043 7.15363C6.94348 6.96351 10.1241 4.07046 10.1857 3.80802C10.1934 3.77519 10.2005 3.65284 10.1279 3.58824C10.0552 3.52363 9.94789 3.54573 9.87047 3.5633C9.76074 3.5882 8.01293 4.74344 4.62703 7.02901C4.13092 7.36968 3.68156 7.53566 3.27895 7.52697C2.8351 7.51738 1.98131 7.27601 1.34661 7.06969C0.56812 6.81664 -0.0506068 6.68284 0.0032705 6.25308C0.0313331 6.02923 0.339594 5.8003 0.928055 5.56629Z"
                fill="#37AEE2"
              />
            </svg>
          </Link>
        </li>
      </ul>
      <p className="mobile__conf">
        Конфиденциальность • Условия сервиса • <br /> Политика использования
        cookies
      </p>
    </div>
  );
};