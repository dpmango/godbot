import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppDispatch } from "./reducers/hooks.store";
import { getCurrentUser } from "./reducers/userFetchSlice.reducer";
import { Layout } from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { TarifWindow } from "./components/ModalsWindow/TarifWindow";
import { Switch } from "devextreme-react";
import { PaymentPage } from "./pages/PaymentPage";

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const [theme, changeTheme] = useState(false);
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
        <Route path="/"  element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="payment" element={<PaymentPage/>} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
