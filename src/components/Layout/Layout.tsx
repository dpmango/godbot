/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import { Header } from "./Header";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import "./layout.scss";
import { TarifWindow } from "../ModalsWindow/TarifWindow";
import { Greeting } from "../Greeting/Greeting";
import { current } from "@reduxjs/toolkit";
import { useAppSelector } from "../../reducers/hooks.store";

export const Layout: React.FC<{}> = () => {
  const { currentModal } = useAppSelector((state) => state.modalState);
  let ctx = useContext(ThemeContext);
  const params = useParams();
  const { pathname } = useLocation();

  return (
    <>
      <Link
        to={pathname.slice(0, pathname.length - 7)}
        className={params["*"] === "tarifs" ? "blur-bg show" : "blur-bg"}
      ></Link>
      {currentModal ? <Greeting /> : ""}
      <div className={ctx?.theme ? "main _black-theme" : "main"}>
        {params["*"] === "tarifs" ? <TarifWindow /> : ""}
        <div className="container">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};
