import React, { useState, useEffect } from "react";
import { Row, Col, Modal, notification } from "antd";
import StudentContext from "./student-context";
import { AddStudent } from "./addStudent";
import {
  titleCase,
  getData,
  routeCenters,
  routeProgrammeCenters,
  routeStudents,
  manageStudents,
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
    const {
      center_id,
      email,
      index_number,
      programme,
      ref_number,
      student_name,
    } = student;
    let newstate = {
      student_center: center_id,
      prog_cen_id: programme,
      index_number: index_number,
      ref_number: ref_number,
      email: email,
      student_name: titleCase(student_name.trim()),
    };

    manageStudents({
      ...newstate,
      url: routeStudents,
      headers,
      type: "post",
    }).then(res => {
      // console.log(res)
      res.data.students !== undefined
        ? setstudents(res.data.students)
        : setstudents([]);
      notification["success"]({
        message: `${titleCase(student_name.trim())} added successfully`,
        description: `${titleCase(
          student_name.trim()
        )} details also created successfully.`,
        className: "notification-style",
      });
    });
  };

  const removeStudentElements = student => {
    const { student_name, ref_number } = student;
    confirm({
      title: `Are you sure you want to delete ${student_name}?`,
      content: `If you proceed, ${student_name} will be deleted`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        manageStudents({
          ...student,
          url: routeStudents,
          headers,
          type: "delete",
        });
        const newStudents = students.filter(
          element => element.ref_number !== ref_number
        );
        setstudents(newStudents);
        notification["success"]({
          message: "Delete status",
          description: `${student_name} details deleted successfully.`,
          className: "notification-style",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const updateStudentElements = student => {
    console.log("Update: ", student);
    notification["success"]({
      message: "Update status",
      description: `${titleCase(
        student.student_name.trim()
      )} details updated successfully.`,
      className: "notification-style",
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
    getData({ url: routeStudents, headers }).then(data => {
      console.log("student data: ", data);
      data.students !== undefined
        ? setstudents(data.students)
        : setstudents([]);
    });
  }, []);

  const openFileDialog = programme => {
    // console.log(semester);
    const o = Dialog.showOpenDialog({ properties: ["openFile"] });
    const workbook = XLSX.readFile(o[0]);

    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

    const newData = data
      .filter((array, i) => array.length > 0 && i > 0)
      .map(element => {
        return element;
        // console.log(element);
      });

    console.log("students: ", newData);
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
