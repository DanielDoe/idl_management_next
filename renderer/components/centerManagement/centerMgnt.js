import React, { useState, useEffect } from "react";
import { Row, Col, Modal, notification } from "antd";
import CenterMgntContext from "./centerMgnt-context";
import { AddCenterMgnt } from "./newCenterMgnt";
import {
  getData,
  manageProgrammeCenter,
  routeAllocations,
  routeCenters,
  routeProgrammeCenters,
} from "../_shared/axiosCalls";
import CenterMgntList from "./centerMgntList";
import "./centerMgnt.css";

export default () => {
  const confirm = Modal.confirm;
  const [centerMgnts, setCenterMgnts] = useState([
    //make a db call for the already allocated programmes
  ]);
  // const centerName = JSON.parse(localStorage.getItem("login")).center;
  // const center_id = JSON.parse(localStorage.getItem("login")).center_id;
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
    // let newValues = [...venues, centerMgnt];
    const { center, programmes, capacity } = centerMgnt;
    // console.log(center, user)
    let newstate = {
      center_id: user.center_name === center ? user.center_id : center,
      programme_id: programmes,
      capacity: capacity,
    };

    manageProgrammeCenter({
      ...newstate,
      url: routeProgrammeCenters,
      headers,
      type: "post",
    }).then(res => {
      setCenterMgnts(res.data.programmeCenterAllocations);
      notification["success"]({
        message: `Center programmes added successfully`,
        description: `Programmes and its courses added to center successfully.`,
      });
    });
    // console.log("Adding CenterMgnts: ", newstate);
  };

  const removeCenterMgntElements = centerMgnt => {
    confirm({
      title: `Are you sure you want to delete this programme?`,
      content: `If you proceed, the selected programme will be deleted`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        manageProgrammeCenter({
          ...centerMgnt,
          url: routeProgrammeCenters,
          headers,
          type: "delete",
        });
        const newState = centerMgnts.filter(
          element => element.prog_cen_id !== centerMgnt.prog_cen_id
        );
        setCenterMgnts(newState);
        notification["success"]({
          message: "Delete status",
          description: `Programmes deleted successfully.`,
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
    getData({ url: routeProgrammeCenters, headers }).then(data => {
      console.log("center programmes: ", data);
      data.programmeCenterAllocations !== undefined
        ? setCenterMgnts(data.programmeCenterAllocations)
        : setCenterMgnts([]);
    });
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
