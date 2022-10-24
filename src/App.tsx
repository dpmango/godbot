import React, { createContext, useLayoutEffect, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reducers/hooks.store";
import { getCurrentUser } from "./reducers/userFetchSlice.reducer";
import { Layout } from "./components/Layout/Layout";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PaymentPage } from "./pages/PaymentPage";
import { Authorization } from "./pages/Authorization";
import { Partnership } from "./pages/Partnership";
import Cookies from "js-cookie";
import { useFetch } from "./hooks/useFetch";

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const [test, setTest] = useState<any>()
  const { getFetch } = useFetch(setTest);
  const init = async () => {
    const resp = await fetch("https://dev.godbot.pro/api/auth/user/", {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      } as any
    });
    const data = await resp.json();
    console.log(data);
  };

  const [theme, changeTheme] = useState(false);
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const handleChangeTheme = () => {
    changeTheme(!theme);
  };

  useEffect(() => {
    getFetch('https://dev.godbot.pro/api/auth/user/')
    init()
    dispatch(getCurrentUser({ login: "can4ik22", password: "10061978Asd" }));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="partnership" element={<Partnership />} />
        </Route>
        <Route path="/auth" element={<Authorization />}>
          <Route index element={<Authorization />} />
          <Route path="*" element={<Authorization />} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
