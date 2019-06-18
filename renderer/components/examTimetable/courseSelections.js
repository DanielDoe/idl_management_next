import React, { useState, useEffect } from "react";
import Calender from "../_shared/img/calendar.png";
import { Transfer, Button, Row, Col, Icon } from "antd";

export default class ExamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
    };
  }

  componentDidMount() {
    this.getMock();
  }

  // componentWillUpdate() {
  //   console.log(mockData);
  // }

  getMock = () => {
    const targetKeys = [];
    // const mockData = this.props.courses;
    // for (let i = 0; i < 20; i++) {
    // 	const data = {
    // 		key: i.toString(),
    // 		title: `content${i + 1}`,
    // 		description: `description of content${i + 1}`,
    // 	};
    // 	mockData.push(data);
    // }
    const mockData = this.props.courses.map((element, id) => {
      return {
        course_id: element.course_id,
        key: id,
        course_title: element.course_title,
        course_code: element.course_code,
        title: `${element.course_code}-${element.course_title}`,
        // chosen: Math.random() * 2 > 1,
      };
    });
    this.setState({ mockData });
    // console.log(mockData)
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys });
    console.log(targetKeys, moveKeys);
  };

  renderFooter = () => (
    <Button
      size="small"
      style={{ float: "right", margin: 5 }}
      onClick={this.getMock}
    >
      reload
    </Button>
  );

  render() {
    const { fieldData } = this.props;
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
                      <li>{"Code: " + fieldData.course_code}</li>
                      <li>{"Title: " + fieldData.course_title}</li>
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
                dataSource={this.state.mockData}
                showSearch
                style={{ height: "100%", width: "100%" }}
                listStyle={{
                  width: "40%",
                  height: "calc(100% - 5rem)",
                }}
                operations={["to right", "to left"]}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => `${item.title}`}
                footer={this.renderFooter}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
