import Cookies from "js-cookie";
import { useState, Dispatch, SetStateAction } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AuthorizationForm } from "../components/Authorization/AuthorizationForm";
import { AuthorizationSlider } from "../components/Authorization/AuthorizationSlider";
import { AuthorizationValidate } from "../components/Authorization/AuthorizationValidate";
import { useAppSelector } from "../reducers/hooks.store";

export const Authorization: React.FC<{}> = () => {
  const [value, setValue] = useState("");
  const { search } = useLocation();
  const { userData } = useAppSelector((state) => state.userState);

  if (search === "?Trial=true") {
    Cookies.set("trial", "active");
  }

  const sendEmail = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}auth/login/`, {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
      headers: {
        "Content-Type": "application/json" as string,
        "X-CSRFToken": Cookies.get("csrftoken") as string,
      },
    });

    return resp;
  };

  return (
    <div className="authorization">
      <Link
        to={!userData?.data.tariff ? "/auth/registration" : "/"}
        className="authorization__logo"
      >
        <img src="http://localhost:3000/images/logo-auth.svg" alt="" />
      </Link>

      <div className="authorization__inner">
        <Routes>
          <Route
            path="/validation"
            element={<AuthorizationValidate sendEmail={sendEmail} />}
          />
          <Route path="/registration" element={<AuthorizationForm />} />
        </Routes>
        <img className="authorization__bg" src="/images/reg-bg.png" alt="" />
      </div>
    </div>
  );
};
