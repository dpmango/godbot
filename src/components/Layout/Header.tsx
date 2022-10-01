/* eslint-disable jsx-a11y/anchor-is-valid */
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
        <a className="logo" href="#">
          <img src="./images/Logo.svg" alt="" />
        </a>
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
