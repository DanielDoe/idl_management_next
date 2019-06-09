import React, { Component, useState, useEffect } from "react";
import { Row, Col } from "antd";
import School from "../_shared/img/school.png";
import Calender from "../_shared/img/calendar1.png";
import Screen from "../_shared/img/analytics.png"
import Typewriter from "typewriter-effect";

export default params => {
  const [timer, setTimer] = useState(true);

  const typerwriter = text => {
    return (
      <Typewriter
        options={{
          strings: text,
          autoStart: true,
          loop: timer,
        }}
      />
    );
  };
  return (
    <div className="sider-container-style">
      <Row gutter={10} style={{ margin: "2rem auto" }}>
        <Col span={6}>
          <img className="sider-img" src={Screen} alt="school-img" />
        </Col>
        <Col span={18} className="sider-img">
          <div className="type-writer-class">
            {typerwriter([
              "Manage your centers",
              "Add new centers",
              "Update center details",
              "Remove center data",
              "Manage center coordinators",
              "Manage teaching timetable",
              "Manage exams timetable",
              "Manage student centers",
            ])}
          </div>
        </Col>
      </Row>
      {/* <Row gutter={10} style={{ margin: "2rem auto" }}>
        <Col span={4}>
          <img className="sider-img" src={Calender} alt="school-img" />
        </Col>
        <Col span={20}>
          <div className="type-writer-class">
            {typerwriter([
              "Manage your centers",
              "Add new centers",
              "Update center details",
              "Remove center data",
              "Manage center coordinators",
            ])}
          </div>
        </Col>
      </Row>
      <Row gutter={10} style={{ margin: "2rem auto" }}>
        <Col span={4}>
          <img className="sider-img" src={School} alt="school-img" />
        </Col>
        <Col span={20}>
          <div className="type-writer-class">
            {typerwriter([
              "Manage your centers",
              "Add new centers",
              "Update center details",
              "Remove center data",
              "Manage center coordinators",
            ])}
          </div>
        </Col>
      </Row> */}
    </div>
  );
};
