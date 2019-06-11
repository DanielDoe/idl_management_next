import React, { useState, useEffect } from "react";
// import ExamTable from "./examTable";
import {
  routeCenters,
  getData,
  routeAllocations,
  routeProgrammeCenters,
  routeVenues,
  routeTeachingTimeTable,
} from "../_shared/axiosCalls";
import ExamContext from "./exams-context";
import { AddExam } from "./newDataFields";
import TimetableList from "./timetables";
import { Row, Col } from "antd";
import ExamTable from "./courseSelections"
// import AdminSelection from "./adminSelections";
import "./exam.css";

export default () => {
  const [programmes, setprogrammes] = useState([]);
  const [dataSource, setdataSource] = useState([]);
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
    const { center, programme, semester } = exam;
    let data = programmes.filter(elem => elem.programme_id === programme && elem.center_id === center);
    let newState = {
      center_id: center,
      programme_id: programme,
      semester: semester
    };

    if (data.length !== 0){
      setdataSource([...dataSource, {...data[0], semester, center}]);
      console.log("datasource: ", data);
    } else {
      swal({
        title: "Sorry!",
        text: "No allocation was found for selected center!",
        icon: "error",
        timer: 3000
      });
    }
  };

  const removeExamElements = exam => {
    console.log("exam", exam);
  };

  const updateExamElements = exam => {
    console.log("exam", exam);
  };

  const onValueEditted = value => {
    seteditMode(true);
    setfieldData(value);
  };

  const onButtonPressed = (selection, details) => {
    // const { name } = e.target;
    setactiveSelection(selection);
    console.log(details);
    setfieldData(details)

  };


  useEffect(() => {
    // getData({ url: routeCenters, headers }).then(data => {
    //   data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
    //   //   console.log(data);
    // });

    getData({ url: routeProgrammeCenters, headers }).then(data => {
      data.programmeCenterAllocations !== undefined
        ? setprogrammes(data.programmeCenterAllocations)
        : setprogrammes([]);
    });

    // getData({ url: routeVenues, headers }).then(data => {
    //   data.venues !== undefined ? setvenues(data.venues) : setvenues([]);
    //   //   console.log(data);
    // });

    //   getData({ url: routeTeachingTimeTable, headers }).then(data => {
    //     data.timetables !== undefined ? setdataSource(data.timetables) : setdataSource([]);
    //       console.log(data);
    //   });

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
                      programmes={programmes}
                      dataSource={dataSource}
                      user={user}
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
                  user={user}
                  onButtonPressed={onButtonPressed}
                  programmes={programmes}
                />
              );
            default:
              break;
          }
    } else {
      return <div>Coordinator</div>;
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
