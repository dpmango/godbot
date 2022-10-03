import Cookies from "js-cookie";
import { useLayoutEffect, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TarifWindow } from "../components/ModalsWindow/TarifWindow";
import { Table } from "../components/Table/Table";
import { Transaction } from "../components/Transaction/Transaction";
import { useAppSelector } from "../reducers/hooks.store";

export const HomePage: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("name")) {
      navigate("/auth/registration");
    }
  }, [userData]);

  return (
    <>
      <Table />
      <Transaction />
      <Routes>
        <Route path="tarifs" element={<TarifWindow />}></Route>
      </Routes>
    </>
  );
};
