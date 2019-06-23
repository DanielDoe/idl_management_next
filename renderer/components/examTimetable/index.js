import React, { useState, useEffect } from "react";
// import ExamTable from "./examTable";
import {
  routeCenters,
  getData,
  routeAllocations,
  routeProgrammeCenters,
  routeVenues,
  routeCourses,
  routeExamTimeTableItem,
  manageExamsTimetable,
  routeExamTimetable,
} from "../_shared/axiosCalls";
import moment from "moment";
import ExamContext from "./exams-context";
import { AddExam } from "./newDataFields";
import TimetableList from "./timetables";
import UserTimeTable from "./time-table";
import { Row, Col, Modal } from "antd";
import ExamTable from "./courseSelections";
// import AdminSelection from "./adminSelections";
import "./exam.css";

const confirm = Modal.confirm;
export default () => {
  const [programmes, setprogrammes] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [centers, setcenters] = useState([]);
  const [examstimetableitems, setexamstimetableitems] = useState([]);
  const [courses, setCourses] = useState([]);
  const [venues, setvenues] = useState([]);
  const [fieldData, setfieldData] = useState([]);
  const [activeSelection, setactiveSelection] = useState("timetable");
  const user = JSON.parse(localStorage.getItem("login"));
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };

  const addExamElements = exam => {
    // setfieldData(exam)
    console.log(exam);
    const { start, end, semester, type } = exam;
    let newstate = {
      date: moment(start).format("L"),
      day: moment(start).format("dddd"),
      end_time: moment(end).format("LLLL"),
      semester: semester,
      exam_type: type,
      start_time: moment(start).format("LLLL"),
    };

    manageExamsTimetable({
      ...newstate,
      url: routeExamTimetable,
      headers,
      type: "post",
    }).then(res => {
      setdataSource(res.data.timetables);
      // console.log("data: ", res);
    });
    // setdataSource([...dataSource, { ...exam }]);
  };

  const removeExamElements = exam => {
    confirm({
      title: "Are you sure delete this item?",
      content: "Your current timetable will be delete",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        manageExamsTimetable({
          ...exam,
          url: routeExamTimetable,
          headers,
          type: "delete",
        });
        const newstate = dataSource.filter(
          element => element.exam_timetable_id !== exam.exam_timetable_id
        );
        setdataSource(newstate);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const updateExamElements = exam => {
    console.log("exam", exam);
  };

  const onValueEditted = value => {
    seteditMode(true);
    setfieldData(value);
  };

  const onButtonPressed = (selection, details) => {
    setactiveSelection(selection);
    console.log("details: ", details);
    setfieldData(details);
  };

  useEffect(() => {
    getData({ url: routeCenters, headers }).then(data => {
      data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
    });

    getData({ url: routeProgrammeCenters, headers }).then(data => {
      data.programmeCenterAllocations !== undefined
        ? setprogrammes(data.programmeCenterAllocations)
        : setprogrammes([]);
    });

    getData({ url: routeVenues, headers }).then(data => {
      data.venues !== undefined ? setvenues(data.venues) : setvenues([]);
    });

    getData({ url: routeExamTimetable, headers }).then(data => {
      console.log(data);
      data.timetables !== undefined
        ? setdataSource(data.timetables)
        : setdataSource([]);
    });

    getData({ url: routeCourses, headers }).then(data => {
      data.courses !== undefined ? setCourses(data.courses) : setCourses([]);
    });

    return () => {
      console.log("Unmounted component");
    };
  }, []);

  const renderContent = () => {
    if (user.auth_status === "admin") {
      switch (activeSelection) {
        case "timetable":
          return (
            <Row style={{ height: "100%" }}>
              <Col span={16} style={{ height: "100%" }}>
                <TimetableList
                  //   venues={venues}
                  //   centers={centers}
                  user={user}
                  programmes={programmes}
                  dataSource={dataSource}
                  user={user}
                  onItemRemove={removeExamElements}
                  onButtonPressed={onButtonPressed}
                  //   onValueEditted={onValueEditted}
                />
              </Col>
              <Col
                span={8}
                style={{
                  height: "100%",
                  borderLeft: "1px solid rgba(0,0,0,0.12)",
                }}
              >
                <AddExam
                  user={user}
                  fieldData={fieldData}
                  programmes={programmes}
                  //   onCancel={triggerEditmode}
                  //   onValueEditted={onValueEditted}
                />
              </Col>
            </Row>
          );
        case "timetable-content":
          return (
            <ExamTable
              fieldData={fieldData}
              courses={courses}
              user={user}
              onButtonPressed={onButtonPressed}
              programmes={programmes}
            />
          );
        case "timetable-content-edit":
          return (
            <UserTimeTable
              venues={venues}
              fieldData={fieldData}
              courses={courses}
              user={user}
              onButtonPressed={onButtonPressed}
              programmes={programmes}
            />
          );
        default:
          break;
      }
    } else {
      switch (activeSelection) {
        case "timetable":
          return (
            <Row style={{ height: "100%" }}>
              <Col span={24} style={{ height: "100%" }}>
                <TimetableList
                  //   venues={venues}
                  //   centers={centers}
                  user={user}
                  programmes={programmes}
                  dataSource={dataSource}
                  user={user}
                  onItemRemove={removeExamElements}
                  onButtonPressed={onButtonPressed}
                  //   onValueEditted={onValueEditted}
                />
              </Col>
            </Row>
          );
        case "timetable-content-edit":
          return (
            <UserTimeTable
              venues={venues}
              courses={courses}
              programmes={programmes}
              fieldData={fieldData}
              courses={courses}
              user={user}
              onButtonPressed={onButtonPressed}
              programmes={programmes}
            />
          );
        default:
          break;
      }
    }
  };

  return (
    <ExamContext.Provider
      value={{
        // venues: venues,
        user: user,
        // centers: centers,
        programmes: programmes,
        dataSource: dataSource,
        addExamElements: addExamElements,
        removeExamElements: removeExamElements,
        updateExamElements: updateExamElements,
      }}
    >
      <div id="exams" className="exams-container">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          {renderContent()}
        </div>
      </div>
    </ExamContext.Provider>
  );
};
