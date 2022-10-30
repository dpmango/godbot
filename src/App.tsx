import React, {
  createContext,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { useAppDispatch } from "./reducers/hooks.store";
import { getCurrentUser } from "./reducers/userFetchSlice.reducer";
import { Layout } from "./components/Layout/Layout";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PaymentPage } from "./pages/PaymentPage";
import { Authorization } from "./pages/Authorization";
import { Partnership } from "./pages/Partnership";
import Cookies from "js-cookie";

interface IThemeContext {
  theme: boolean;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {
  const [theme, changeTheme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeTheme = () => {
    changeTheme(!theme);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
    if (!Cookies.get("messages")) {
      navigate("/auth/registration");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="partnership" element={<Partnership />}>
            <Route path="*" element={<Partnership />} />
          </Route>
          <Route path="payment" element={<PaymentPage />}>
            <Route path="*" element={<PaymentPage />} />
          </Route>
          <Route path="*" element={<HomePage />} />
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
