import { createContext, useLayoutEffect, useState, useEffect } from 'react';
import { Layout } from '@c/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { PaymentPage } from '@/pages/PaymentPage';
import { Authorization } from '@/pages/Authorization';
import { Partnership } from '@/pages/Partnership';

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'false');
  }
  const [theme, changeTheme] = useState<boolean>(JSON.parse(localStorage.getItem('theme') as any));

  const handleChangeTheme = () => {
    changeTheme(!theme);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme.toString());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="?coin/:timestamp" element={<HomePage />} />
          <Route path="partnership" element={<Partnership />}>
            <Route path="*" element={<Partnership />} />
          </Route>
          <Route path="payment" element={<PaymentPage />}>
            <Route path="*" element={<PaymentPage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<Authorization />}>
          <Route index element={<Authorization />} />
          <Route path="*" element={<Authorization />}>
            <Route path="?Trial=true" element={<Authorization />} />
          </Route>
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
