import React, { useState } from "react";
import { Row, Col } from "antd";
import CenterContext from "./center-context";
import { AddCenters } from "./newCenter";
import CenterList from "./centerList";
import "./center.css";

export default () => {
  const [centers, setCenters] = useState([
    {
      name: "Accra",
      code: "ACC",
    },
    {
      name: "Volta",
      code: "VR",
    },
    {
      name: "Kumasi",
      code: "KMA",
    },
  ]);

  const addCenterElements = center => {
    // updatedCenters = centers
    // setCenters(newCenter);
    let newCenter = [];
    console.log("Adding centers", newCenter);
    // setCenters(centers.push(center))
  };

  const removeCenterElements = center => {
    console.log("Removing centers", center);
  };

  const updateCenterElements = center => {
    console.log("Updating centers", center);
  };

  return (
    <CenterContext.Provider
      value={{
        centers: centers,
        addCenterElements: addCenterElements,
        removeCenterElements: removeCenterElements,
        updateCenterElements: updateCenterElements,
      }}
    >
      <div style={{ width: "100%" }} id="center">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <CenterList />
            </Col>
            <Col span={8} style={{ height: "100%", borderLeft: "1px solid rgba(0,0,0,0.12)" }}>
              <AddCenters />
            </Col>
          </Row>
        </div>
      </div>
    </CenterContext.Provider>
  );
};
