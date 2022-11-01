import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDropdown } from "../../hooks/useDropdown";
import { useSkeleton } from "../../hooks/useSkeleton";

export const UserCardDropDown: React.FC<{}> = () => {
  const { menuState, handleStateChange } = useDropdown();
  const { loaded } = useSkeleton(true);
  const { pathname } = useLocation();
  const path = pathname.split("/").at(-1);

  return (
    <div className="user">
      <button
        disabled={loaded ? true : false}
        className={
          menuState
            ? "header__usercard-menu header__usercard-menu--active"
            : "header__usercard-menu"
        }
        onClick={handleStateChange}
      >
        <span style={{ backgroundColor: loaded ? "silver" : "#262628" }}></span>
        <span style={{ backgroundColor: loaded ? "silver" : "#262628" }}></span>
        <span style={{ backgroundColor: loaded ? "silver" : "#262628" }}></span>
      </button>

      <ul
        className={menuState ? "user__list user__list--active" : "user__list"}
      >
        {/* <li className="user__item">
          <Link
            to={path !== "" ? `/${path}/tarifs` : `${path}tarifs`}
            onClick={handleStateChange}
            className="user__item"
          >
            <img src="./images/header/Group.svg" alt="" /> Тарифы
          </Link>
        </li> */}
        <li className="user__item disabled" onClick={handleStateChange}>
          <Link to="/partnership">
            <img src="./images/header/Group.svg" alt="" /> ПАРТНЕРСКАЯ ПРОГРАММА
          </Link>
        </li>
        <li className="user__item disabled" onClick={handleStateChange}>
          <img src="./images/header/Crown.svg" alt="" /> ОБУЧАЮЩИЙ ЦЕНТР
        </li>
        <li className="user__item disabled" onClick={handleStateChange}>
          <img src="./images/header/Lightbulb.svg" alt="" /> Предложить идею
        </li>
        <li className="user__item disabled" onClick={handleStateChange}>
          <img src="./images/header/StickyNote.svg" alt="" /> Справочный центр
        </li>
        <li className="user__item disabled" onClick={handleStateChange}>
          <img src="./images/header/Conversation.svg" alt="" /> Написать нам
        </li>
        <li className="user__item disabled" onClick={handleStateChange}>
          <img src="./images/header/Gift.svg" alt="" /> Что нового
        </li>
      </ul>
    </div>
  );
};
