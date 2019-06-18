import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Calender from "../_shared/img/calendar.png";
import {
  Select,
  Drawer,
  Row,
  Col,
  Button,
  Empty,
  Icon,
  Tag,
  Avatar,
  Checkbox,
} from "antd";
import swal from "sweetalert";
import Building from "../_shared/img/university.png";
import user from "../users/user";
import { element } from "prop-types";

const { Option } = Select;
let selection = [];
const CheckboxGroup = Checkbox.Group;
export default class UserTimeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      childrenDrawer: false,
      courses: [],
      selectedVenue: null,
      programmeCapacity: 0,
      venueCapacity: 0,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      //   childrenDrawer: false,
    });
  };

  onChange = e => {
    const { checked, value } = e.target;
    if (checked) {
      selection.push(value);
      console.log(`Adding selection: `, selection);
    } else {
      selection = selection.filter(element => element !== value);
      console.log(`Removing selection: `, selection);
    }
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  showChildrenDrawer = element => {
    this.setState({
      childrenDrawer: true,
      selectedVenue: element,
      programmeCapacity: 0,
    });
    console.log(element);
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
      //   visible: false,
    });
  };

  renderCapacity = element => {
    // console.log("element: ", element);
    // if (element.venue_id === this.state.selectedVenue.venue_id) {
    //   return (
    //     <span>
    //       {element.venue_capacity - this.state.programmeCapacity <= 0 ? (
    //         <Tag color="#f50">Full</Tag>
    //       ) : (
    //         element.venue_capacity - this.state.programmeCapacity
    //       )}
    //     </span>
    //   );
    // } else {
    //   return <spam>{element.venue_capacity}</spam>;
    // }
  };

  renderVenue = () => {
    if (this.props.venues.length !== 0) {
      return this.props.venues.map((element, id) => {
        return (
          <div
            className="venue-item"
            onClick={() => this.showChildrenDrawer(element)}
          >
            <div className="venue-item-view ripple">
              {/* <Button type="primary" onClick={this.showChildrenDrawer}>
					{element.venue_name}
				  </Button> */}
              <Row gutter={8}>
                <Col span={5} style={{ height: "5rem" }}>
                  <img
                    style={{ height: "3rem", width: "3rem", margin: "1rem" }}
                    src={Building}
                    alt="venue-img"
                  />
                </Col>
                <Col span={19}>
                  <div className="venue-details">
                    <div>
                      Venue name: <span>{element.venue_name}</span>
                    </div>
                    <div>Venue capacity: {this.renderCapacity(element)}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
      });
    } else {
      return <Empty />;
    }
  };

  renderCourses = () => {
    return (
      <div>
        {this.props.programmes
          .filter(element => element.center_id !== this.props.user.center_id)
          .map((element, id) => {
            return (
              <div key={"id" + id}>
                <Checkbox value={element.programme_id} onChange={this.onChange}>
                  {`${element.programme_name} (${element.capacity})`}
                </Checkbox>
              </div>
            );
          })}
      </div>
    );
  };

  componentDidMount() {
    console.log(this.props);
  }

  // check capacities
  handleSubmit = () => {
    const { user, programmes, venues } = this.props;
    const { selectedVenue } = this.state;
    let capacity = 0;
    selection.map(element => {
      let newdata = programmes
        .filter(
          elem =>
            elem.programme_id === element && elem.center_id === user.center_id
        )
        .map(item => {
          capacity += item.capacity;
        });
    });
    this.setState({ programmeCapacity: capacity });

    let venueCapacity = venues.filter(
      element =>
        element.center_id === selectedVenue.center_id &&
        element.venue_id === selectedVenue.venue_id
    )[0].venue_capacity;

    this.setState({ venueCapacity });

    // console.log("selected venue capacity: ", venueCapacity);

    if (venueCapacity >= capacity) {
      swal({
        title: "Good job!",
        text: `Venue allocated successfully. You have ${venueCapacity -
          capacity} space left to fill!`,
        icon: "success",
        timer: 3000,
        button: "Ok",
      });
      this.setState({ visible: false, childrenDrawer: false });
    } else {
      swal({
        title: "Well done!",
        text: `Venue allocated successfully. But you need ${capacity -
          venueCapacity} more space to fully allocate the selected course!`,
        icon: "info",
        timer: 3000,
        button: "Ok",
      });
      this.setState({ childrenDrawer: false });
    }
  };

  renderContent = () => {
    const { fieldData } = this.props;
    if (fieldData.courses.length !== 0) {
      return fieldData.courses.map((element, id) => {
        return (
          <div className="column-timetable-edit">
            <div
              className="card-timetable-exams"
              style={{ height: "9rem" }}
              key={element.course_title + id}
            >
              <Row gutter={16}>
                <Col span={4}>
                  <Avatar
                    size={36}
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {(
                      element.course_title.split(" ")[0].substring(0, 1) +
                      element.course_title.split(" ")[1].substring(0, 1)
                    ).toUpperCase()}
                  </Avatar>
                </Col>
                <Col span={20}>
                  <div className="card-item-view">
                    <p>{element.course_title}</p>
                    <p>Capacity: {element.capacity}</p>
                    <p>Venue: {}</p>
                    <p>Space left: {}</p>
                    <div>
                      <Button onClick={() => this.showDrawer()}>
                        add venue
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="empty-container">
          <Empty style={{ margin: "30% auto" }} />
        </div>
      );
    }
  };

  render() {
    const { fieldData } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <Row style={{ height: "100%" }} gutter={16}>
          <Col span={6} className="details-pane">
            <div className="details-view">
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
          <Col span={18} className="table-container-view">
            <h2>List of assigned courses</h2>
            <div className="table-container">
              <div className="row-timetable-exams">{this.renderContent()}</div>
            </div>
          </Col>
        </Row>
        <div>
          <Drawer
            title="List of venues"
            width={520}
            className="venue-drawer"
            closable={false}
            // maskClosable={true}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            {this.renderVenue()}

            <Drawer
              title="List of programmes"
              className="inner-drawer"
              width={320}
              closable={true}
              //   maskClosable={false}
              onClose={this.onChildrenDrawerClose}
              visible={this.state.childrenDrawer}
            >
              <div>
                <p>Select programmes for venue</p>
                {this.renderCourses()}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e8e8e8",
                  padding: "10px 16px",
                  textAlign: "right",
                  left: 0,
                  background: "#fff",
                  borderRadius: "0 0 4px 4px",
                }}
              >
                <Button
                  style={{
                    marginRight: 8,
                  }}
                  onClick={() =>
                    this.setState({ visible: false, childrenDrawer: false })
                  }
                >
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                  Submit
                </Button>
              </div>
            </Drawer>
          </Drawer>
        </div>
      </div>
    );
  }
}
