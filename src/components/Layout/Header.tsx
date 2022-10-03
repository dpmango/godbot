/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { LanguageDropdown } from "../Dropdown/LanguageDropdown";
import { MenuDropdown } from "../Dropdown/MenuDropdown";
import { QuestionDropdown } from "../Dropdown/QuestionDropdown";
import { ThemeChanger } from "../UIelems/ThemeChanger";
import { UserCard } from "../UIelems/UserCard";
import { Winrate } from "../UIelems/Winrate";

export const Header: React.FC<{}> = () => {
  return (
    <header className="header">
      <nav className="menu">
        <Link to="/" className="logo">
          <img src="./images/Logo.svg" alt="" />
        </Link>
        <MenuDropdown />
        <ThemeChanger />
        <Winrate />
        <QuestionDropdown />
        <LanguageDropdown />
        <UserCard />
      </nav>
    </header>
  );
};
