import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CenterMgntContext from "./centerMgnt-context";
import { AddCenterMgnt } from "./newCenterMgnt";
import {
  getData,
  manageProgrammeCenter,
  routeAllocations,
  routeCenters,
} from "../_shared/axiosCalls";
import CenterMgntList from "./centerMgntList";
import "./centerMgnt.css";

export default () => {
  const [centerMgnts, setCenterMgnts] = useState([
    //make a db call for the already allocated programmes
  ]);
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };
  const [allocations, setallocations] = useState([]);
  const [centers, setcenters] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("login")));
  const addCenterMgntElements = centerMgnt => {
    let newValues = [...venues, centerMgnt];
    console.log("Venues: ", newValues);
    setCenterMgnts(newValues);
    // console.log("Adding CenterMgnts", CenterMgnt);
  };

  const removeCenterMgntElements = centerMgnt => {
    console.log("Removing CenterMgnts", centerMgnt);
  };

  const updateCenterMgntElements = centerMgnt => {
    console.log("Updating CenterMgnts", centerMgnt);
  };

  const onValueEditted = value => {
    seteditMode(true);
    setfieldData(value);
  };

  const triggerEditmode = () => {
    seteditMode(false);
  };

  useEffect(() => {
    getData({ url: routeAllocations, headers }).then(data => {
      data.courseAllocations !== undefined
        ? setallocations(data.courseAllocations)
        : setallocations([]);
    //   console.log(data);
    });
    getData({ url: routeCenters, headers }).then(data => {
      data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
    //   console.log(data);
    });
    // 	getData({ url: routeAllocations, headers }).then(data => {
    // 		// console.log('Allocations: ', data)
    // 		data.courseAllocations !== undefined ? setAllocations(data.courseAllocations) : setAllocations([]);
    // });
  }, []);

  return (
    <CenterMgntContext.Provider
      value={{
        centerMgnts: centerMgnts,
        user: user,
        centers: centers,
        allocations: allocations,
        addCenterMgntElements: addCenterMgntElements,
        removeCenterMgntElements: removeCenterMgntElements,
        updateCenterMgntElements: updateCenterMgntElements,
      }}
    >
      <div style={{ width: "100%" }} id="centerMgnt">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <CenterMgntList
                centerMgnts={centerMgnts}
                onValueEditted={onValueEditted}
              />
            </Col>
            <Col
              span={8}
              style={{
                height: "100%",
                borderLeft: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <AddCenterMgnt
                editMode={editMode}
                onCancel={triggerEditmode}
                fieldData={fieldData}
                onValueEditted={onValueEditted}
              />
            </Col>
          </Row>
        </div>
      </div>
    </CenterMgntContext.Provider>
  );
};
