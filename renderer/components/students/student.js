import React, { useState, useEffect } from "react";
import { Row, Col, Modal, notification } from "antd";
import StudentContext from "./student-context";
import { AddStudent } from "./addStudent";
import {
  titleCase,
  getData,
  routeCenters,
  routeProgrammeCenters,
} from "../_shared/axiosCalls";
import XLSX from "xlsx";
import StudentList from "./studentLIst";
import "./student.css";

export default () => {
  const Dialog = require("electron").remote.dialog;
  // const [courses, setCourses] = useState([]);
  const [students, setstudents] = useState([]);
  const [programmes, setprogrammes] = useState([]);
  const confirm = Modal.confirm;
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("login")));
  const [centers, setcenters] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };

  const addStudentElements = student => {
    console.log("student data: ", student);
    const { center_id, index_number, programme, ref_number, student_name } = student;
    let newstate = {
        student_center: center_id,
        student_programme: programme,
        index_number: index_number,
        ref_number: ref_number,
        student_name: titleCase(student_name.trim())
    }
    notification["success"]({
      message: `${titleCase(student_name.trim())} added successfully`,
      description: `${titleCase(
        student_name.trim()
      )} details also created successfully.`,
    });
  };

  const removeStudentElements = student => {
    console.log(student);
    // confirm({
    //   title: `Are you sure you want to delete ${center_name}?`,
    //   content: `If you proceed, ${center_name} will be deleted`,
    //   okText: "Yes",
    //   okType: "danger",
    //   cancelText: "No",
    //   onOk() {
    //     manageCenters({
    //       ...center,
    //       url: routeCenters,
    //       headers,
    //       type: "delete",
    //     });
    //     const newCenters = centers.filter(
    //       element => element.center_id !== center.center_id
    //     );
    //     setCenters(newCenters);
    //     notification["success"]({
    //       message: "Delete status",
    //       description: `${center_name} details deleted successfully.`,
    //     });
    //   },
    //   onCancel() {
    //     console.log("Cancel");
    //   },
    // });
  };

  const updateStudentElements = student => {
    console.log("Update: ", student);
    notification["success"]({
      message: "Update status",
      description: `${titleCase(
        student.student_name.trim()
      )} details updated successfully.`,
    });
  };

  const onValueEditted = value => {
    seteditMode(true);
    setfieldData(value);
  };

  const triggerEditmode = () => {
    seteditMode(false);
  };

  useEffect(() => {
    getData({ url: routeCenters, headers }).then(data => {
      data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
      //   console.log(data);
    });
    getData({ url: routeProgrammeCenters, headers }).then(data => {
      console.log("programme center: ", data);
      data.programmeCenterAllocations !== undefined
        ? setprogrammes(data.programmeCenterAllocations)
        : setprogrammes([]);
    });
  }, []);

  const openFileDialog = semester => {
    // console.log(semester);
    const o = Dialog.showOpenDialog({ properties: ["openFile"] });
    const workbook = XLSX.readFile(o[0]);

    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

    const newData = data
      .filter((array, i) => array.length > 0 && i > 0)
      .map(element => {
        const newname = element[1];
        console.log(element);
      });
  };

  return (
    <StudentContext.Provider
      value={{
        students: students,
        user: user,
        centers: centers,
        programmes: programmes,
        addStudentElements: addStudentElements,
        removeStudentElements: removeStudentElements,
        updateStudentElements: updateStudentElements,
      }}
    >
      <div style={{ width: "100%" }} id="student">
        <div style={{ height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <StudentList
                students={students}
                centers={centers}
                user={user}
                programmes={programmes}
                onValueEditted={onValueEditted}
              />
            </Col>
            <Col
              span={8}
              style={{
                height: "100%",
                overflowY: "auto",
                borderLeft: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <AddStudent
                centers={centers}
                user={user}
                programmes={programmes}
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
    </StudentContext.Provider>
  );
};
