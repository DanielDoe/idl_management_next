import React, { Component, useState, useEffect } from "react";
import { Row, Col, Input, Select, Button, Empty } from "antd";
import Calender3 from "../_shared/img/calendar3.png";
import Calender2 from "../_shared/img/calendar1.png";
const Search = Input.Search;
const Option = Select.Option;
export default props => {
  const [search, setsearch] = useState(null);
  const [center, setcenter] = useState("all");
  const [programme, setprogramme] = useState("all");
  const [semester, setsemester] = useState("all");
  const [dataSearch, setdataSearch] = useState([]);

  const timetableFilter = (dataSource, programme, semester) => {
    if (semester === "all" && programme === "all") {
      setdataSearch(dataSource);
    } else if (semester !== "all" && programme === "all") {
      let data = dataSource.filter(
        element => element.semester === parseInt(semester)
      );
      setdataSearch(data);
      console.log("data semester: ", data);
    } else if (semester === "all" && programme !== "all") {
      let data = dataSource.filter(
        element => element.programme_id === programme
      );
      setdataSearch(data);
      console.log("data programme: ", data);
    } else {
      let data = dataSource.filter(
        element =>
          element.semester === parseInt(semester) &&
          element.programme_id === programme
      );
      setdataSearch(data);
      console.log("data generic: ", data);
    }
  };

  useEffect(() => {
    if (center === "all") {
      timetableFilter(props.dataSource, programme, semester);
    } else {
      timetableFilter(
        props.dataSource.filter(element => element.center_id === center),
        programme,
        semester
      );
    }
  }, [props.dataSource, programme, semester, center]);

  const renderCenterData = () => {
    const centers = props.centers.map((element, index) => {
      // console.log(element.name);
      return (
        <Option value={element.center_id} key={element.center_name + index}>
          {element.center_name}
        </Option>
      );
    });

    return centers;
  };

  const renderProgramData = () => {
    const programmes = props.programmes
      .filter(element => element.center_id === props.user.center_id)
      .map((element, index) => {
        // console.log(element.name);
        return (
          <Option
            value={element.programme_id}
            key={element.name + element.year}
          >
            {element.programme_name}
          </Option>
        );
      });

    return programmes;
  };

  const onSearch = e => {
    const value = e.target.value.toLowerCase();
    const newData = props.dataSource.filter(
      s => s.programme_name.toLowerCase().search(value) !== -1
    );
    setdataSearch(newData);
    // console.log("Value: ", value);
  };

  const renderContent = () => {
    if (dataSearch.length !== 0) {
      return dataSearch.map((element, id) => {
        return (
          <div className="column-timetable">
            <div className="card-timetable" key={"id" + id}>
              <img
                className="calender-img"
                src={id % 2 === 0 ? Calender3 : Calender2}
                alt="calender"
              />
              <h3>{element.programme_code}</h3>
              <p>{element.programme_name}</p>
              <p>Capacity: {element.capacity}</p>
              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    name="timetable-content"
                    icon="edit"
                    onClick={() =>
                      props.onButtonPressed("timetable-content", element)
                    }
                  />
                </Col>
                <Col span={12}>
                  <Button
                    name="timetable-content"
                    icon="delete"
                    type="danger"
                    onClick={() => props.onItemRemove(element)}
                  />
                </Col>
              </Row>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="empty-container">
          <Empty style={{ margin: "40% auto" }} />
        </div>
      );
    }
  };
  return (
    <div className="teaching-list column">
      <div className="list-container">
        <Row gutter={16}>
          <Col span={6}>
            <Select
              className="exam-selector"
              defaultValue={
                props.user.auth_status !== "admin" ? props.user.center : center
              }
              disabled={props.user.auth_status !== "admin" ? true : false}
              onChange={e => setcenter(e)}
            >
              {renderCenterData()}
              <Option value="all">all centers</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Programme"
              className="exam-selector"
              defaultValue="all"
              onChange={e => setprogramme(e)}
            >
              {renderProgramData()}
              <Option value="all">all programmes</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Semester"
              className="exam-selector"
              defaultValue="all"
              onChange={e => setsemester(e)}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="all">all semesters</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Search
              placeholder="search for venue"
              // size="large"
              className="center-programme"
              onChange={e => onSearch(e)}
              style={{ width: "90%" }}
            />
          </Col>
        </Row>
        <h2>List of timetables</h2>
        <div className="table-container">
          <div className="row-timetable">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
