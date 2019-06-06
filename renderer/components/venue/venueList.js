import React, { useState, useEffect, useContext } from "react";
import { Input, Table, Row, Col, Select } from "antd";
import VenueContext from "./venue-context";
// import swal from '@sweetalert/with-react'

const Search = Input.Search;
const Option = Select.Option;
export default props => {
  const dataSource = props.venues.map((elem, id) => {
    return {
      ...elem,
      key: id,
      sn: id + 1,
    };
  });

  const context = useContext(VenueContext);
  const [center, setcenter] = useState(
    context.user.auth_status !== "admin" ? context.user.center : null
  );
  const [dataSearch, setdataSearch] = useState(dataSource);
  const [width, setwidth] = useState(window.innerWidth);
  const [height, setheight] = useState(window.innerHeight);

  useEffect(() => {
    setwidth(window.innerWidth);
    setheight(window.innerHeight);
  }, [height, width]);

  useEffect(() => {
    let option =
      context.user.auth_status === "admin" ? center : context.user.center_id;
    const dataSource = props.venues
      .map((elem, id) => {
        return {
          ...elem,
          key: id,
          sn: id + 1,
        };
      })
      .filter(element => element.center_id == option);

    // console.log(dataSource.filter(element => element.center_id == option));
    setdataSearch(dataSource);
  }, [props.venues, center]);

  useEffect(() => {
    console.log("center: ", center);
    console.log("center context: ", context.user.center_id);
  }, [center, context]);

  const onSearch = e => {
    console.log(e.target.value);
    const value = e.target.value.toLowerCase();
    const newData = dataSource.filter(
      s => s.venue_name.toLowerCase().search(value) !== -1
    );
    // let newDataSource = (newData.length === 0) ? newData : data
    setdataSearch(newData);
  };

  const renderCenterData = () => {
    const elements = context.centers.map((element, index) => {
      // console.log(element.name);
      return (
        <Option value={element.center_id} key={element.center_name + index}>
          {element.center_name}
        </Option>
      );
    });

    return elements;
  };

  const columns = [
    { title: "SN", dataIndex: "sn", key: "sn" },
    { title: "Center", dataIndex: "center_name", key: "center_name" },
    { title: "Room", dataIndex: "venue_name", key: "venue_name" },
    // { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: "Capacity", dataIndex: "venue_capacity", key: "venue_capacity" },
    {
      title: " ",
      render: (text, record) => (
        <div className="action-column grid">
          <button
            className="edit column"
            onClick={() => props.onVenueEditted(record)}
          >
            Edit
          </button>
          <button
            className="delete column"
            onClick={() => context.removeVenueElements(record)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Select
              defaultValue={
                context.user.auth_status !== "admin"
                  ? context.user.center
                  : null
              }
              disabled={context.user.auth_status !== "admin" ? true : false}
              // placeholder="e.g. Accra"
              className="center-programme"
              style={{ width: "90%" }}
              onChange={value => setcenter(value)}
            >
              {renderCenterData()}
            </Select>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Search
              placeholder="search for venue"
              // size="large"
              className="center-programme"
              onChange={e => onSearch(e)}
              style={{ width: "90%" }}
            />
          </Col>
        </Row>
      </div>
      <div className="venue-list column">
        <div className="list-container">
          <h2>List of Venues</h2>
          <div className="table-container">
            <Table
              // loading={dataSearch.length !== 0 ? false : true}
              className="venue-list-table"
              dataSource={dataSearch}
              pagination={{ pageSize: height / 200 }}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
