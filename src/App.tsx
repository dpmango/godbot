import { createContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { YMInitializer } from 'react-yandex-metrika';

import { localStorageGet, localStorageSet } from '@utils';
import { useProfile } from '@hooks';
import Router from '@/pages/Routes';

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const { fetchProfileWithLogout, setUserSettings } = useProfile();

  if (!localStorageGet('theme')) {
    localStorageSet('theme', false);
  }
  const [theme, changeTheme] = useState<boolean>(localStorageGet('theme'));

  const handleChangeTheme = () => {
    changeTheme(!theme);
    localStorageSet('theme', !theme);
  };

  useEffect(() => {
    const init = async () => {
      await fetchProfileWithLogout();
      await setUserSettings();
    };

    init();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Router />
      <ToastContainer />
      {process.env.REACT_APP_YM_ID && (
        <YMInitializer
          accounts={[+process.env.REACT_APP_YM_ID]}
          options={{ webvisor: true }}
          version="2"
        />
      )}
    </ThemeContext.Provider>
  );
}

export default App;
