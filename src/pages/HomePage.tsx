import Cookies from "js-cookie";
import { useLayoutEffect, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TarifWindow } from "../components/ModalsWindow/TarifWindow";
import { Table } from "../components/Table/Table";
import { Transaction } from "../components/Transaction/Transaction";
import { useAppSelector } from "../reducers/hooks.store";
import { Helmet } from "react-helmet";

export const HomePage: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('auth')) {
      navigate('/auth/registration')
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Godbot | Home</title>
      </Helmet>
      <Table />
      <Transaction />
    </>
  );
};
