import React from "react";
import Head from "next/head";
import { Row, Col } from "antd";
import { LocaleProvider } from "antd";
import moment from "moment";
import "../components/login/login.css";
import "antd/dist/antd.css";
import { Login } from "../components/login/login";
import Sider from "./_shared/img/undraw_schedule_pnbk.png";
import LoginCarousel from "../components/login/login-carousel";
import { url } from "inspector";
moment.locale("en");


export default () => {
  return (
    <LocaleProvider>
      <React.Fragment>
        <Head>
          <title>Institute of Distance Learning</title>
        </Head>

        <div style={{ height: "100vh", width: "100%" }}>
          <Row gutter={0} style={{ height: "100%", width: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <div className="carousel-container" >
                {/* <img className="sider-img" src={Sider} alt="sider-img" /> */}
              </div>
            </Col>
            <Col span={8} className="login-container">
              <div className="login-container-style">
                <Login />
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    </LocaleProvider>
  );
};
