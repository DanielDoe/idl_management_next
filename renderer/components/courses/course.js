import React, { useState, useEffect } from "react";
import { Row, Col, Modal, notification } from "antd";
import CourseContext from "./course-context";
import { AddCourse } from "./newCourse";
import {
  titleCase,
  getData,
  manageCourses,
  routeCourses,
} from "../_shared/axiosCalls";
import XLSX from "xlsx";
import CourseList from "./courseList";
import "./course.css";

export default () => {
  const Dialog = require("electron").remote.dialog;
  const confirm = Modal.confirm;
  const [courses, setCourses] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };

  const addCourseElements = course => {
    const { course_title, semester, year, course_code } = course;
    // add new course
    let newstate = {
      course_code: course_code.toUpperCase().trim(),
      course_title: titleCase(course_title.trim()),
      semester: semester,
      year: year,
    };
    manageCourses({
      ...newstate,
      url: routeCourses,
      headers,
      type: "post",
    }).then(res => {
      setCourses(res.data.courses);
      notification["success"]({
        message: `${titleCase(course_title.trim())} added successfully`,
        description: `${titleCase(
          course_title.trim()
        )} details also created successfully.`,
      });
    });
  };

  const removeCourseElements = course => {
    let course_name = titleCase(course.course_title.trim());
    confirm({
      title: `Are you sure you want to delete ${course_name}?`,
      content: `If you proceed, ${course_name} will be deleted`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        manageCourses({
          ...course,
          url: routeCourses,
          headers,
          type: "delete",
        });
        const newState = courses.filter(
          element => element.course_id !== course.course_id
        );
        setCourses(newState);
        notification["success"]({
          message: "Delete status",
          description: `${course_name} details deleted successfully.`,
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const updateCourseElements = course => {
    const { course_id, course_title, semester, year, course_code } = course;
    let newstate = {
      course_id: course_id,
      course_code: course_code.toUpperCase().trim(),
      course_title: titleCase(course_title).trim(),
      semester: semester,
      year: year,
    };
    manageCourses({ ...newstate, url: routeCourses, headers, type: "put" });
    const update = courses.map(element =>
      element.course_id === course.course_id ? course : element
    );
    setCourses(update);
    notification["success"]({
      message: "Update status",
      description: `${titleCase(
        course_title.trim()
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
    getData({ url: routeCourses, headers }).then(data => {
      data.courses !== undefined ? setCourses(data.courses) : setCourses([]);
      console.log(data.courses);
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
        // console.log(element);
        addCourseElements({
          course_code: element[0],
          course_name: element[1],
        });
      });
  };

  return (
    <CourseContext.Provider
      value={{
        courses: courses,
        addCourseElements: addCourseElements,
        removeCourseElements: removeCourseElements,
        updateCourseElements: updateCourseElements,
      }}
    >
      <div style={{ width: "100%" }} id="course">
        <div style={{ height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <CourseList courses={courses} onValueEditted={onValueEditted} />
            </Col>
            <Col
              span={8}
              style={{
                height: "100%",
                borderLeft: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <AddCourse
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
    </CourseContext.Provider>
  );
};
