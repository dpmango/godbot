import { Link, Route, Routes } from "react-router-dom";
import { AuthorizationForm } from "../components/Authorization/AuthorizationForm";
import { AuthorizationSlider } from "../components/Authorization/AuthorizationSlider";
import { AuthorizationValidate } from "../components/Authorization/AuthorizationValidate";
import { useAppSelector } from "../reducers/hooks.store";

export const Authorization: React.FC<{}> = () => {
  const {userData} = useAppSelector(state => state.userState)
  return (
    <div className="authorization">
      <Link to={!userData?.tariff ? '/auth/registration' : '/'} className="authorization__logo">
        <img src="http://localhost:3000/images/logo-auth.svg" alt="" />
      </Link>
      <img
        className="authorization__bg"
        src="http://localhost:3000/images/bg.svg"
        alt=""
      />
      <div className="authorization__inner">
        <Routes>
          <Route path="/validation" element={<AuthorizationValidate />} />
          <Route path="/registration" element={<AuthorizationForm />} />
        </Routes>
        <AuthorizationSlider />
      </div>
    </div>
  );
};
