import React from "react";
import Dashboard from "../components/dashboard";
import ReactNoSSR from "react-no-ssr";

export default () => (
  <React.Fragment>
    <ReactNoSSR>
      <Dashboard />
    </ReactNoSSR>
  </React.Fragment>
);
