import React from "react";
import Head from "next/head";
import { resolve } from "../helpers";
import LoginPage from "../components";
import ReactNoSSR from "react-no-ssr";

export default () => (
  <React.Fragment>
    <ReactNoSSR>
      <LoginPage />
    </ReactNoSSR>
  </React.Fragment>
);
