import React, { useState, useEffect } from "react";
import { Row, Col, Modal, notification } from "antd";
import CenterContext from "./center-context";
import { AddCenters } from "./newCenter";
import CenterList from "./centerList";
import {
  getData,
  manageCenters,
  titleCase,
  routeCenters,
} from "../_shared//axiosCalls";
import "./center.css";
import { element } from "prop-types";

export default () => {
  const [centers, setCenters] = useState([]);
  const confirm = Modal.confirm;
  const center = JSON.parse(localStorage.getItem("login")).center;
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);

  const addCenterElements = center => {
    const { center_name, center_code, center_block } = center;
    const newstate = {
      center_name: titleCase(center_name.trim()),
      center_code: center_code.toUpperCase().trim(),
      center_block: center_block,
    };
    manageCenters({
      ...newstate,
      url: routeCenters,
      headers,
      type: "post",
    }).then(res => {
      setCenters(res.data.centers);
      notification["success"]({
        message: `${titleCase(center_name.trim())} added successfully`,
        description: `${titleCase(
          center_name.trim()
        )} details also created successfully.`,
      });
    });
  };

  const removeCenterElements = center => {
    let center_name = titleCase(center.center_name.trim());
    confirm({
      title: `Are you sure you want to delete ${center_name}?`,
      content: `If you proceed, ${center_name} will be deleted`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        manageCenters({
          ...center,
          url: routeCenters,
          headers,
          type: "delete",
        });
        const newCenters = centers.filter(
          element => element.center_id !== center.center_id
        );
        setCenters(newCenters);
        notification["success"]({
          message: "Delete status",
          description: `${center_name} details deleted successfully.`,
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const updateCenterElements = center => {
    const { center_name, center_code, center_block, center_id } = center;
    const centerUpdate = {
      center_name: titleCase(center_name.trim()),
      center_code: center_code.toUpperCase().trim(),
      center_block: center_block,
      center_id: center_id,
    };
    manageCenters({ ...centerUpdate, url: routeCenters, headers, type: "put" });
    const newstate = centers.map(element =>
      element.center_id === center.center_id ? center : element
    );
    setCenters(newstate);
    notification["success"]({
      message: "Update status",
      description: `${titleCase(
        center_name.trim()
      )} details updated successfully.`,
    });
  };

  const onCenterEditted = center => {
    seteditMode(true);
    setfieldData(center);
  };

  const triggerEditmode = () => {
    seteditMode(false);
  };

  useEffect(() => {
    getData({ url: routeCenters, headers }).then(data => {
      data.centers !== undefined ? setCenters(data.centers) : setCenters([]);
      console.log(data);
    });
  }, []);

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
              <CenterList centers={centers} onCenterEditted={onCenterEditted} />
            </Col>
            <Col
              span={8}
              style={{
                height: "100%",
                borderLeft: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <AddCenters
                editMode={editMode}
                onCancel={triggerEditmode}
                fieldData={fieldData}
                onCenterEditted={onCenterEditted}
              />
            </Col>
          </Row>
        </div>
      </div>
    </CenterContext.Provider>
  );
};
