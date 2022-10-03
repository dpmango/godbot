/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import { Header } from "./Header";
import { Link, Outlet, useParams } from "react-router-dom";
import "./layout.scss";

export const Layout: React.FC<{}> = () => {
  let ctx = useContext(ThemeContext);
  const params = useParams();

  return (
    <>
      <Link
        to="/"
        className={params["*"] === "tarifs" ? "blur-bg show" : "blur-bg"}
      ></Link>
      <div className={ctx?.theme ? "main _black-theme" : "main"}>
        <div className="container">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};
