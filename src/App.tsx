import { createContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { YMInitializer } from 'react-yandex-metrika';

import { localStorageGet, localStorageSet } from '@utils';
import { useProfileRequest } from '@hooks';
import Router from '@/pages/Routes';

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const { requestProfile } = useProfileRequest();

  if (!localStorageGet('theme')) {
    localStorageSet('theme', false);
  }
  const [theme, changeTheme] = useState<boolean>(localStorageGet('theme'));

  const handleChangeTheme = () => {
    document.body.classList.add('theme-switching');
    setTimeout(() => {
      document.body.classList.remove('theme-switching');
    }, 200);

    changeTheme(!theme);
    localStorageSet('theme', !theme);
  };

  useEffect(() => {
    requestProfile();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Router />
      <ToastContainer />
      <YMInitializer
        accounts={[process.env.REACT_APP_YM_ID]}
        options={{ webvisor: true }}
        version="2"
      />
    </ThemeContext.Provider>
  );
}

export default App;
