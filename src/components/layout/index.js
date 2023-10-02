import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import "./Header.css";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
