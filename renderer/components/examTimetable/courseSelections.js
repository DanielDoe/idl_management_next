import React, { useState, useEffect } from "react";
import Calender from "../_shared/img/calendar.png";
import moment from "moment";
import {
  getData,
  routeExamTimeTableItem,
  manageExamTimetableItem,
} from "../_shared/axiosCalls";
import { Transfer, Button, Row, Col, Icon, Modal } from "antd";

const saveStyle = {
  width: "80%",
  // float: 'right',
};
const { confirm } = Modal;
export default class ExamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
      selectedKeys: [],
      result: []
    };
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });

    console.log("sourceSelectedKeys: ", sourceSelectedKeys);
    console.log("targetSelectedKeys: ", targetSelectedKeys);
  };

  componentDidMount() {
    // make api call to get the details i need to render in the transfer component
    const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
    const headers = {
      "x-access-token": token,
      "content-type": "application/json",
    };
    const { exam_timetable_id, semester } = this.props.fieldData;
    manageExamTimetableItem({
      exam_timetable_id,
      semester,
      url: routeExamTimeTableItem,
      headers,
      type: "get",
    }).then(res => {
      console.log("timetable item: ", res);
      this.setState({ result: res.examTimeTableItems})
      this.getMock(res.examTimeTableItems);
    });
  }

  getMock = data => {
    const targetKeys = [];
    const mockData = data.map((element, id) => {
      const source = {
        course_id: element.course_id,
        key: element.course_id.toString(),
        assigned: element.assigned,
        description: `${element.course_code} - ${element.course_title}`,
        course_title: element.course_title,
        course_code: element.course_code,
        title: `${element.course_code} - ${element.course_title}`,
      };

      if (source.assigned) {
        targetKeys.push(source.key);
      }

      return source;
    });
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys });
    console.log(targetKeys, moveKeys, direction);
  };

  handleSubmit = () => {
    const { mockData, targetKeys } = this.state;
    const { fieldData } = this.props;
    const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
    const headers = {
      "x-access-token": token,
      "content-type": "application/json",
    };
    // console.log(mockData)
    confirm({
      title: "Do you want to save this allocations",
      content:
        "The selected courses will be saved and made available to center coordinators for venue allocations",
      onOk() {
        let check = mockData.filter(element => element.assigned == 1).length;
        if (check < 1) {
          let newstate = {
            exam_timetable_id: fieldData.exam_timetable_id,
            semester: fieldData.semester,
            courses: targetKeys,
          };
          manageExamTimetableItem({
            ...newstate,
            url: routeExamTimeTableItem,
            headers,
            type: "post",
          }).then(res => console.log(res));
          console.log("making a post request for: ", newstate);
        } else {
          let newstate = {
            exam_timetable_id: fieldData.exam_timetable_id,
            semester: fieldData.semester,
            courses: targetKeys,
          };
          manageExamTimetableItem({
            ...newstate,
            url: routeExamTimeTableItem,
            headers,
            type: "put",
          }).then(res => console.log(res));
          console.log("making a put request for: ", newstate);
        }
      },
      onCancel() {},
    });
  };

  handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };

  onSearch = (direction, value) => {
    // console.log("search: ", direction, value);
    /**
     *
     * Trying to write my own filter method here for the transfer component
     */
    let searchValue = value.toLowerCase();
    if (direction === "right") {
      const targetKeys = this.state.mockData
        .filter(
          s =>
            s.course_title.toLowerCase().search(searchValue) !== -1 &&
            s.assigned === true
        )
        .map(element => element.course_id.toString());
      // this.setState({ targetKeys });
      console.log("right search: ", targetKeys);
    } else {
      const newData = this.state.mockData.filter(
        s => s.course_title.toLowerCase().search(searchValue) !== -1
        //&& s.status === 'assigned'
      );
      console.log("left search: ", newData);
    }
  };

  renderFooter = () => (
    <Button
      size="small"
      style={{ float: "right", margin: 5 }}
      onClick={() => this.getMock(this.state.result)}
    >
      reload
    </Button>
  );

  render() {
    const { fieldData } = this.props;
    const { targetKeys, mockData, selectedKeys } = this.state;
    return (
      <div style={{ height: "100%" }}>
        <Row gutter={8} style={{ height: "100%" }}>
          <Col span={6} className="details-pane">
            <div className="details-view" style={{ background: "#eeeeee" }}>
              <Button
                style={{ margin: "0.5rem" }}
                onClick={() => this.props.onButtonPressed("timetable", [])}
              >
                <Icon type="left" />
                Go back
              </Button>
              <div className="details-view-bottom">
                <Row gutter={6}>
                  <Col span={3}>
                    <img
                      src={Calender}
                      className="calender-img"
                      alt="exam-timetable"
                    />
                  </Col>
                  <Col span={21}>
                    <ul className="nobull">
                      <li>{"Date: " + moment(fieldData.date).format("ll")}</li>
                      <li>{"Semester: " + fieldData.semester}</li>
                      <li>{"Type: " + fieldData.type}</li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={18} className="transfer-col">
            <div style={{ height: "100%", width: "100%", margin: "0rem 2rem" }}>
              <h2 className="courses-list">List of Courses to Assign</h2>
              <Transfer
                dataSource={mockData}
                titles={["Unassigned courses", "Assigned courses"]}
                // selectedKeys={mockData}
                // filterOption={this.filterOption}
                showSearch
                style={{ height: "100%", width: "100%" }}
                listStyle={{
                  width: "40%",
                  height: "calc(100% - 5rem)",
                }}
                onSearch={this.onSearch}
                operations={["assign", "unassign"]}
                targetKeys={targetKeys}
                onSelectChange={this.handleSelectChange}
                onChange={this.handleChange}
                render={item => item.title}
                footer={this.renderFooter}
              />
            </div>
            <Row gutter={16}>
              <Col span={6} />
              <Col span={6} />
              <Col span={6} />
              <Col span={6}>
                <div>
                  <Button onClick={this.handleSubmit} style={saveStyle}>
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
