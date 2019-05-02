
import React from "react";
import Head from "next/head";
import { Row, Col } from "antd";
import "../components/login/login.css";
import { Login } from "../components/login/login";


export default () => (
  <React.Fragment>
    <Head>
      <title>Institute of Distance Learning</title>
    </Head>

    <div
      className="login-container"
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <Row>
        <Col span={12} />
        <Col span={12} >
          <div className="login-container-style">
            <Login />
          </div>
        </Col>
      </Row>

    </div>
  </React.Fragment>
);
