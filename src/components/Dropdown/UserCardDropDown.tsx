import { useState } from 'react';
import { formatInTimeZone, utcToZonedTime, toDate } from 'date-fns-tz';
import { Link, useLocation } from 'react-router-dom';
import { useDropdown } from '@hooks/useDropdown';
import { useSkeleton } from '@hooks/useSkeleton';
import { useAppSelector } from '@store/hooks.store';
import { checkOnPro } from '@utils/scripts';
import { ThemeChanger } from '@c/UIelems/ThemeChanger';
import { format } from 'date-fns';

export const UserCardDropDown: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const { menuState, handleStateChange } = useDropdown();
  const { loaded } = useSkeleton(true);
  const { pathname } = useLocation();
  const path = pathname.split('/').at(-1);

  return (
    <div className="user">
      <button
        disabled={loaded ? true : false}
        className={
          menuState
            ? 'header__usercard-menu header__usercard-menu--active'
            : 'header__usercard-menu'
        }
        onClick={handleStateChange}>
        <span style={{ backgroundColor: loaded ? 'silver' : '#262628' }}></span>
        <span style={{ backgroundColor: loaded ? 'silver' : '#262628' }}></span>
        <span style={{ backgroundColor: loaded ? 'silver' : '#262628' }}></span>
      </button>

      <ul className={menuState ? 'user__list user__list--active' : 'user__list'}>
        <li className="user__item disabled">
          <Link to={path !== '' ? `/${path}/tarifs` : `${path}tarifs`} onClick={handleStateChange}>
            Сменить тариф
          </Link>
        </li>
        <li className="user__item item-mobile disabled">
          <Link to={'/partership'} onClick={handleStateChange}>
            Партнерская программа
          </Link>
        </li>
        <li className="user__item item-mobile disabled">
          <Link to={'/presale'} onClick={handleStateChange}>
            Пресейлы
          </Link>
        </li>
        <li className="user__item item-mobile disabled">
          <Link to={'/learning_center'} onClick={handleStateChange}>
            Обучающий КУРС
          </Link>
        </li>
        <li className="user__item disabled" onClick={handleStateChange}>
          <Link to="/">Привязать Telegram-бота</Link>
        </li>
        <li
          className={checkOnPro(userData) ? 'user__item' : 'user__item pro'}
          onClick={handleStateChange}>
          <Link to="/partnership">Перейти в Telegram-чат</Link>
        </li>
        <div className="user__wrapper">
          <ul className="mobile__socials">
            <li>
              <Link to={'/'}>
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.49696 11.4844C9.59005 11.4844 12.3765 7.26382 12.3765 3.60484C12.3765 3.48619 12.3739 3.3649 12.3686 3.24625C12.9107 2.85424 13.3785 2.36869 13.75 1.8124C13.2452 2.03701 12.7092 2.1837 12.1603 2.24746C12.7382 1.90106 13.1709 1.35687 13.3782 0.71579C12.8346 1.03798 12.24 1.26526 11.6201 1.38789C11.2023 0.944049 10.6501 0.650174 10.0486 0.551699C9.44709 0.453225 8.82992 0.555637 8.29248 0.8431C7.75504 1.13056 7.32726 1.58707 7.07529 2.14203C6.82332 2.697 6.76118 3.31952 6.89849 3.91334C5.79765 3.8581 4.72071 3.57213 3.73749 3.07398C2.75427 2.57582 1.8867 1.8766 1.19104 1.02165C0.837475 1.63125 0.729282 2.3526 0.888455 3.0391C1.04763 3.7256 1.46222 4.32573 2.04798 4.71754C1.60823 4.70358 1.17811 4.58518 0.793164 4.37213V4.4064C0.79277 5.04613 1.01393 5.66625 1.41905 6.16135C1.82417 6.65646 2.38824 6.99599 3.01539 7.12222C2.60803 7.23368 2.18049 7.24992 1.76585 7.16969C1.94282 7.71985 2.28713 8.20105 2.75075 8.54611C3.21436 8.89117 3.77413 9.08288 4.35194 9.09449C3.37099 9.86504 2.15922 10.283 0.911816 10.281C0.690599 10.2807 0.469599 10.2671 0.25 10.2404C1.51723 11.0534 2.99136 11.4852 4.49696 11.4844Z"
                    fill="#55ACEE"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9283 1.58754C11.0679 1.19273 10.1452 0.901855 9.18044 0.735257C9.16287 0.732042 9.14532 0.740077 9.13627 0.756148C9.01761 0.967206 8.88616 1.24255 8.79411 1.45897C7.75648 1.30362 6.72417 1.30362 5.70781 1.45897C5.61574 1.23774 5.47952 0.967206 5.36032 0.756148C5.35127 0.740613 5.33372 0.732578 5.31615 0.735257C4.35195 0.901322 3.42925 1.1922 2.56828 1.58754C2.56082 1.59075 2.55443 1.59612 2.55019 1.60308C0.800033 4.21778 0.32059 6.76821 0.555789 9.28703C0.556853 9.29935 0.563771 9.31114 0.573349 9.31863C1.72806 10.1666 2.84659 10.6814 3.94434 11.0227C3.96191 11.028 3.98053 11.0216 3.99171 11.0071C4.25138 10.6525 4.48286 10.2786 4.68133 9.88538C4.69304 9.86236 4.68186 9.83503 4.65792 9.82593C4.29076 9.68665 3.94115 9.51683 3.60485 9.32399C3.57825 9.30846 3.57612 9.27041 3.60059 9.25219C3.67136 9.19916 3.74215 9.14399 3.80972 9.08827C3.82195 9.0781 3.83899 9.07595 3.85336 9.08238C6.06272 10.0911 8.45462 10.0911 10.6379 9.08238C10.6523 9.07542 10.6693 9.07757 10.6821 9.08774C10.7497 9.14345 10.8204 9.19916 10.8917 9.25219C10.9162 9.27041 10.9146 9.30846 10.888 9.32399C10.5517 9.52058 10.2021 9.68665 9.83441 9.82539C9.81047 9.8345 9.79983 9.86236 9.81154 9.88538C10.0143 10.278 10.2457 10.652 10.5006 11.0066C10.5113 11.0216 10.5304 11.028 10.548 11.0227C11.6511 10.6814 12.7696 10.1666 13.9243 9.31863C13.9344 9.31114 13.9408 9.29988 13.9419 9.28756C14.2234 6.37553 13.4704 3.84601 11.9459 1.60361C11.9421 1.59612 11.9358 1.59075 11.9283 1.58754ZM5.01126 7.75333C4.34609 7.75333 3.79801 7.14266 3.79801 6.39269C3.79801 5.64271 4.33546 5.03204 5.01126 5.03204C5.69237 5.03204 6.23514 5.64807 6.22449 6.39269C6.22449 7.14266 5.68704 7.75333 5.01126 7.75333ZM9.49705 7.75333C8.8319 7.75333 8.28381 7.14266 8.28381 6.39269C8.28381 5.64271 8.82125 5.03204 9.49705 5.03204C10.1782 5.03204 10.7209 5.64807 10.7103 6.39269C10.7103 7.14266 10.1782 7.75333 9.49705 7.75333Z"
                    fill="#5F70BE"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.928055 5.56629C4.55193 3.98743 6.96841 2.94654 8.1775 2.44364C11.6297 1.00775 12.347 0.758324 12.8146 0.750088C12.9174 0.748276 13.1474 0.773761 13.2963 0.894614C13.4221 0.996659 13.4567 1.13451 13.4732 1.23126C13.4898 1.32801 13.5104 1.54841 13.494 1.72062C13.3069 3.68625 12.4974 8.45629 12.0856 10.6578C11.9114 11.5894 11.5683 11.9017 11.2361 11.9323C10.5142 11.9987 9.96604 11.4552 9.26685 10.9969C8.17277 10.2797 7.55468 9.83325 6.49268 9.13341C5.26536 8.32463 6.06098 7.8801 6.76043 7.15363C6.94348 6.96351 10.1241 4.07046 10.1857 3.80802C10.1934 3.77519 10.2005 3.65284 10.1279 3.58824C10.0552 3.52363 9.94789 3.54573 9.87047 3.5633C9.76074 3.5882 8.01293 4.74344 4.62703 7.02901C4.13092 7.36968 3.68156 7.53566 3.27895 7.52697C2.8351 7.51738 1.98131 7.27601 1.34661 7.06969C0.56812 6.81664 -0.0506068 6.68284 0.0032705 6.25308C0.0313331 6.02923 0.339594 5.8003 0.928055 5.56629Z"
                    fill="#37AEE2"
                  />
                </svg>
              </Link>
            </li>
          </ul>
          <ThemeChanger />
        </div>
      </ul>
    </div>
  );
};
