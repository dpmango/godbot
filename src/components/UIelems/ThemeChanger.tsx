import { useContext } from 'react';
import { ThemeContext } from '@/App';

export const ThemeChanger: React.FC<{}> = () => {
  let ctx = useContext(ThemeContext);

  return (
    <div className={ctx?.theme ? 'theme theme--black' : 'theme'}>
      <img className="theme__light" src="./images/light-theme.svg" alt="" />
      <img className="theme__night" src="./images/night-theme.svg" alt="" />
      <button className="theme__button" onClick={ctx?.handleChangeTheme}></button>
    </div>
  );
};
