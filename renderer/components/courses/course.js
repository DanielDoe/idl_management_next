import React, { useState } from "react";
import { Row, Col } from "antd";
import CourseContext from "./course-context";
import { AddCourse } from "./newCourse";
import CourseList from "./courseList";
import "./course.css";

export default () => {
  const [courses, setCourses] = useState([
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

  const addCourseElements = course => {
    console.log("Adding courses", course);
  };

  const removeCourseElements = course => {
    console.log("Removing courses", course);
  };

  const updateCourseElements = course => {
    console.log("Updating courses", course);
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
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <CourseList />
            </Col>
            <Col span={8} style={{ height: "100%" }}>
              <AddCourse />
            </Col>
          </Row>
        </div>
      </div>
    </CourseContext.Provider>
  );
};
