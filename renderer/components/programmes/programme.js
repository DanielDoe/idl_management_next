import React, { useState, useEffect } from "react";
import { Row, Col, Modal, notification } from "antd";
import ProgrammeContext from "./programme-context";
import {
  titleCase,
  manageProgrammes,
  getData,
  routeProgrammes,
} from "../_shared/axiosCalls";
import { AddProgramme } from "./newProgramme";
import ProgrammeList from "./programmeList";
import XLSX from "xlsx";
import "./programme.css";

export default () => {
  const Dialog = require("electron").remote.dialog;
  const confirm = Modal.confirm;
  const [programmes, setProgrammes] = useState([]);
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);

  const addProgrammeElements = programme => {
    let promises = [];
    let programme_name = titleCase(programme.programme_name.trim());
    for (let index = 1; index <= programme.year; index++) {
      let newstate = {
        programme_code: programme.programme_code.toUpperCase() + " " + index,
        programme_name:
          titleCase(programme.programme_name).trim() + " " + index,
        year: index,
      };
      manageProgrammes({
        ...newstate,
        url: routeProgrammes,
        headers,
        type: "post",
      }).then(res => {
        setProgrammes(res.data.programmes);
        notification["success"]({
          message: `${programme_name} added successfully`,
          description: `${programme_name} details also created successfully.`,
        });
      });
    }
  };

  const removeProgrammeElements = programme => {
    let programme_name = titleCase(programme.programme_name.trim());
    confirm({
      title: `Are you sure you want to delete ${programme_name}?`,
      content: `If you proceed, ${programme_name} will be deleted`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        manageProgrammes({
          ...programme,
          url: routeProgrammes,
          headers,
          type: "delete",
        });
        const newState = programmes.filter(
          element => element.programme_id !== programme.programme_id
        );
        setProgrammes(newState);
        notification["success"]({
          message: "Delete status",
          description: `${programme_name} details deleted successfully.`,
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const updateProgrammeElements = programme => {
    let programme_name = titleCase(programme.programme_name.trim());
    const newstate = programmes.map(element =>
      element.programme_id === programme.programme_id ? programme : element
    );
    setProgrammes(newstate);
    notification["success"]({
      message: "Update status",
      description: `${programme_name} details updated successfully.`,
    });
  };

  const onValueEditted = value => {
    console.log(value);
    seteditMode(true);
    setfieldData(value);
  };

  const triggerEditmode = () => {
    seteditMode(false);
  };

  useEffect(() => {
    getData({ url: routeProgrammes, headers }).then(data => {
      data.programmes !== undefined
        ? setProgrammes(data.programmes)
        : setProgrammes([]);
    });
  }, []);

  const openFileDialog = year => {
    console.log(year);
    const o = Dialog.showOpenDialog({ properties: ["openFile"] });
    const workbook = XLSX.readFile(o[0]);

    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

    const newData = data
      .filter((array, i) => array.length > 0 && i > 0)
      .map(element => {
        // console.log(element);
        addProgrammeElements({
          code: element[0],
          name: element[1],
        });
        // addStaff({
        //   name: element[1],
        //   member,
        //   status: element[2],
        // });
        // return this.props.teacherAdded({
        //     name: element[1],
        //     member,
        //     status: element[2],
        // });
        //add function here
      });
  };

  return (
    <ProgrammeContext.Provider
      value={{
        programmes: programmes,
        addProgrammeElements: addProgrammeElements,
        removeProgrammeElements: removeProgrammeElements,
        updateProgrammeElements: updateProgrammeElements,
      }}
    >
      <div style={{ width: "100%" }} id="programme">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <ProgrammeList
                programmes={programmes}
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
              <AddProgramme
                editMode={editMode}
                onCancel={triggerEditmode}
                fieldData={fieldData}
                onListUpload={openFileDialog}
                onValueEditted={onValueEditted}
              />
            </Col>
          </Row>
        </div>
      </div>
    </ProgrammeContext.Provider>
  );
};
