import 'react-toastify/dist/ReactToastify.css';

import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { YMInitializer } from 'react-yandex-metrika';

import Router from '@/pages/Routes';

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { fetchProfileWithLogout, setUserSettings } = useProfile();

  if (!localStorageGet('theme')) {
    localStorageSet('theme', true);
  }
  const [theme, changeTheme] = useState<boolean>(localStorageGet('theme'));

  const handleChangeTheme = () => {
    changeTheme(!theme);
    localStorageSet('theme', !theme);
  };

  useEffect(() => {
    const init = async () => {
      const refferer = searchParams.get('referrer_id');
      if (refferer) localStorageSet('refferer', refferer);

      const isUser = await fetchProfileWithLogout();
      if (isUser) await setUserSettings();
    };

    init();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Router />

      <ToastContainer
      // hideProgressBar={true}
      />
      {import.meta.env.VITE_YM_ID && (
        <YMInitializer
          accounts={[+import.meta.env.VITE_YM_ID]}
          options={{ webvisor: true }}
          version="2"
        />
      )}
    </ThemeContext.Provider>
  );
}

export default App;
