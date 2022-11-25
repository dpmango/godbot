import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cns from 'classnames';

import { useSkeleton, useDropdown, useClickOutside } from '@hooks';
import { useAppSelector, useAppDispatch, resetUser } from '@store';

import { Socials, ThemeChanger } from '@c/Layout/Atom';

export const UserCardDropdown: React.FC<{}> = () => {
  const { isProUser } = useAppSelector((state) => state.userState);
  const { menuState, handleStateChange } = useDropdown();
  const { loading } = useSkeleton(true);
  const { pathname } = useLocation();
  const path = pathname.split('/').at(-1);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => handleStateChange(false));

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
  };

  return (
    <div className="user" ref={wrapperRef}>
      <button
        disabled={loading ? true : false}
        className={
          menuState
            ? 'header__usercard-menu header__usercard-menu--active'
            : 'header__usercard-menu'
        }
        onClick={handleStateChange}>
        <span style={{ backgroundColor: loading ? 'silver' : '#262628' }}></span>
        <span style={{ backgroundColor: loading ? 'silver' : '#262628' }}></span>
        <span style={{ backgroundColor: loading ? 'silver' : '#262628' }}></span>
      </button>

      <ul className={menuState ? 'user__list user__list--active' : 'user__list'}>
        <li className="user__item">
          <Link to={`/${path}?tariffs`} onClick={handleStateChange}>
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
        <li className={cns('user__item', !isProUser && 'pro')} onClick={handleStateChange}>
          <a href="https://t.me/+fQvg8JT7oUVhZDZi" target="_blank">
            Перейти в Telegram-чат
          </a>
        </li>
        <li className="user__item">
          <a href={'#'} onClick={handleLogout}>
            Выйти
          </a>
        </li>
        <div className="user__wrapper">
          <Socials />
          <ThemeChanger />
        </div>
      </ul>
    </div>
  );
};
