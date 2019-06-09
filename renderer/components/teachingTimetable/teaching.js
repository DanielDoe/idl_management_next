import React, { useState, useEffect } from "react";
import TeachingTable from "./teachingTable";
import {
  routeCenters,
  getData,
  routeAllocations,
  routeProgrammeCenters,
  routeVenues,
  routeTeachingTimeTable,
} from "../_shared/axiosCalls";
import { Row, Col } from "antd";
import TeachingContext from "./teaching-context";
import { AddTeaching } from "./newTimetable";
import TimetableList from "./timetables";
import swal from 'sweetalert';
import "./teaching.css";

export default () => {
  const [centers, setcenters] = useState([]);
  const [programmes, setprogrammes] = useState([]);
  const [venues, setvenues] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("login")));
  const [activeSelection, setactiveSelection] = useState("timetable");
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };

  const addTeachingElements = teaching => {
    // setfieldData(teaching)
    const { center, programme, semester } = teaching;
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

  const removeTeachingElements = teaching => {
    console.log("teaching", teaching);
  };

  const updateTeachingElements = teaching => {
    console.log("teaching", teaching);
  };

  // const Main = ({ activeSection }) => (
  //   <React.Fragment>
  //     <TimetableList activeSection={activeSection} />
  //     <TeachingTable activeSection={activeSection} />
  //   </React.Fragment>
  // );

  useEffect(() => {
    getData({ url: routeCenters, headers }).then(data => {
      data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
      //   console.log(data);
    });

    getData({ url: routeProgrammeCenters, headers }).then(data => {
      data.programmeCenterAllocations !== undefined
        ? setprogrammes(data.programmeCenterAllocations)
        : setprogrammes([]);
    });

    getData({ url: routeVenues, headers }).then(data => {
      data.venues !== undefined ? setvenues(data.venues) : setvenues([]);
      //   console.log(data);
    });

      getData({ url: routeTeachingTimeTable, headers }).then(data => {
        data.timetables !== undefined ? setdataSource(data.timetables) : setdataSource([]);
          console.log(data);
      });

    return () => {
      console.log("Unmounted component");
    };
  }, []);


  const renderContent = () => {
    switch (activeSelection) {
      case "timetable":
        return (
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <TimetableList
                venues={venues}
                centers={centers}
                programmes={programmes}
                dataSource={dataSource}
                user={user}
                onButtonPressed={onButtonPressed}
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
              <AddTeaching
                editMode={editMode}
                centers={centers}
                user={user}
                fieldData={fieldData}
                programmes={programmes}
                onCancel={triggerEditmode}
                onValueEditted={onValueEditted}
              />
            </Col>
          </Row>
        );
      case "timetable-content":
        return (
          <TeachingTable
            centers={centers}
            venues={venues}
            fieldData={fieldData}
            user={user}
            onButtonPressed={onButtonPressed}
            programmes={programmes}
          />
        );
      default:
        break;
    }
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

  const triggerEditmode = () => {
    seteditMode(false);
  };

  return (
    <TeachingContext.Provider
      value={{
        venues: venues,
        user: user,
        centers: centers,
        programmes: programmes,
        dataSource: dataSource,
        addTeachingElements: addTeachingElements,
        removeTeachingElements: removeTeachingElements,
        updateTeachingElements: updateTeachingElements,
      }}
    >
      <div id="teaching" className="teaching-container">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          {renderContent()}
        </div>
      </div>
    </TeachingContext.Provider>
  );
};
