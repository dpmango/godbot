import React, { createContext, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reducers/hooks.store";
import { getCurrentUser } from "./reducers/userFetchSlice.reducer";
import { Layout } from "./components/Layout/Layout";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PaymentPage } from "./pages/PaymentPage";
import { Authorization } from "./pages/Authorization";
import Cookies from "js-cookie";
import { Partnership } from "./pages/Partnership";

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const [theme, changeTheme] = useState(false);
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const handleChangeTheme = () => {
    changeTheme(!theme);
  };

  useLayoutEffect(() => {
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
