import { createContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, getCurrentUser } from '@store';
import { localStorageGet, localStorageSet } from '@utils';
import Router from '@/pages/Routes';

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    const initStore = async () => {
      const { payload } = await dispatch(getCurrentUser());

      if (!payload) {
        if (localStorageGet('email') && localStorageGet('lastEmailSend')) {
          navigate('/auth/validation', { replace: true });
        } else {
          navigate('/auth', { replace: true });
        }
      }
    };

    initStore();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Router />
      <ToastContainer />
    </ThemeContext.Provider>
  );
}

export default App;
