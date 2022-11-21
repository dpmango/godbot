import { Link } from 'react-router-dom';
import { useDropdown } from '@hooks';
import { SvgIcon } from '@ui';

export const MenuDropdown: React.FC<{}> = () => {
  const { menuState, handleStateChange } = useDropdown();

  return (
    <div className={menuState ? 'menu menu--active' : 'menu'}>
      <button className="menu__button" onClick={handleStateChange}>
        Меню
        <div className="menu__burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <ul className="menu__list">
        <li className="menu__item">
          <Link to="/partnership">
            <SvgIcon name="people" />
            Партнерская программа
          </Link>
        </li>
        <li className="menu__item">
          <SvgIcon name="crown" />
          Обучающий центр
        </li>
        <li className="menu__item">
          <svg
            width="17"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.2444 11.6671C11.6478 10.586 12.5556 8.86467 12.5556 6.92593C12.5556 3.65313 9.96876 1 6.77778 1C3.5868 1 1 3.65313 1 6.92593C1 8.86467 1.90775 10.586 3.31111 11.6671M10.2444 11.6671C9.27879 12.411 8.07848 12.8519 6.77778 12.8519C5.47708 12.8519 4.27676 12.411 3.31111 11.6671M10.2444 11.6671V17L6.77778 13.4444L3.31111 17V11.6671"
              stroke="black"
              strokeLinejoin="round"
            />
          </svg>
          Соревнования
        </li>
        <li className="menu__item">
          <SvgIcon name="ticket" />
          Пресейлы
        </li>
      </ul>
    </div>
  );
};
