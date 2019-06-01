import React, { useState, useEffect, useContext } from "react";
import { Input, Table, Row, Col, Select } from "antd";
import CenterMgntContext from "./centerMgnt-context";
import { dbStore } from "../_shared/initialStoreState"

const Search = Input.Search;
const Option = Select.Option;

export default props => {
  const dataSource = props.centerMgnts.map((elem, id) => {
    return {
      ...elem,
      key: id,
      sn: id + 1,
    };
  });

  const context = useContext(CenterMgntContext);
  const [dataSearch, setdataSearch] = useState(dataSource);
  const [center, setcenter] = useState(
    context.user.auth_status !== "admin" ? context.user.center : "Center"
  );
  const [programme, setprogramme] = useState("");

  useEffect(() => {
    const dataSource = props.centerMgnts.map((elem, id) => {
			return {
				...elem,
				key: id,
				sn: id + 1,
			};
		});
		setdataSearch(dataSource);
  }, [props.centerMgnts]);

  const onSearch = e => {
    // console.log(e.target.value)
    const value = e.target.value.toLowerCase();
    const newData = dataSource.filter(
      s => s.name.toLowerCase().search(value) !== -1
    );
    // let newDataSource = (newData.length === 0) ? newData : data
    setdataSearch(newData);
  };

  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  // const renderTable = () => {
  //   if (center !== undefined && programme === '') {
  //       return [
  //         { title: "SN", dataIndex: "sn", key: "sn" },
  //         { title: "Programme Code", dataIndex: "name", key: "name" },
  //         { title: "Programme name", dataIndex: "course", key: "course" },
  //         // { title: "Programme", dataIndex: "year", key: "year" },
  //         { title: "Capacity", dataIndex: "capacity", key: "capacity" },
  //         {
  //           title: " ",
  //           render: (text, record) => (
  //             <div className="action-column grid">
  //               <button
  //                 className="edit column"
  //                 onClick={() => props.onValueEditted(record)}
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 className="delete column"
  //                 onClick={() => context.removeCenterMgntElements(record)}
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           ),
  //         },
  //       ];
  //   } if(center !== undefined && programme !== '') {
  //       return [
  //         { title: "SN", dataIndex: "sn", key: "sn" },
  //         { title: "Course code", dataIndex: "name", key: "name" },
  //         { title: "Course name", dataIndex: "course", key: "course" },
  //         { title: "Programme", dataIndex: "year", key: "year" },
  //         { title: "Capacity", dataIndex: "capacity", key: "capacity" },
  //         {
  //           title: " ",
  //           render: (text, record) => (
  //             <div className="action-column grid">
  //               <button
  //                 className="edit column"
  //                 onClick={() => props.onValueEditted(record)}
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 className="delete column"
  //                 onClick={() => context.removeCenterMgntElements(record)}
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           ),
  //         },
  //       ];
  //   }
  // }

  const renderDetails = data => {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <h3>Semester 1</h3>
          <ul>
            {data.sem_1.map((element, index) => {
              return <li key={element + index}>{element}</li>;
            })}
          </ul>
        </Col>
        <Col span={12}>
        <h3>Semester 2</h3>
          <ul>
            {data.sem_1.map((element, index) => {
              return <li key={element + index}>{element}</li>;
            })}
          </ul>
        </Col>
      </Row>
    );
  };
  const columns = [
    { title: "SN", dataIndex: "sn", key: "sn" },
    { title: "Programme Code", dataIndex: "name", key: "name" },
    {
      title: "Programme name",
      dataIndex: "programme_name",
      key: "programme_name",
    },
    // { title: "Programme", dataIndex: "year", key: "year" },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    {
      title: " ",
      render: (text, record) => (
        <div className="action-column grid">
          <button
            className="edit column"
            onClick={() => props.onValueEditted(record)}
          >
            Edit
          </button>
          <button
            className="delete column"
            onClick={() => context.removeCenterMgntElements(record)}
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
        <Row>
          <Col span={8}>
            <Select
              value={
                context.user.auth_status !== "admin"
                  ? context.user.center
                  : null
              }
              disabled={context.user.auth_status !== "admin" ? true : false}
              // placeholder="e.g. Accra"
              style={{ width: "90%" }}
              onChange={e => setcenter(e)}
            >
              {context.centers.map((elem, index) => {
                return (
                  <Option value={elem.center_id} key={elem.center_id}>
                    {elem.center_name}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              placeholder="e.g Computer Engineering"
              style={{ width: "90%" }}
              onChange={e => setprogramme(e)}
            >
              {context.allocations.map((elem, index) => {
                return (
                  <Option value={elem.programme_id} key={elem.programme_id}>
                    {elem.programme_name}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={8}>
            <Search
              placeholder="search for programme/course"
              // size="large"
              onChange={e => onSearch(e)}
              style={{ width: "90%" }}
            />
          </Col>
        </Row>
      </div>
      <div className="centerMgnt-list column">
        <div className="list-container">
          <h2>Center Allocations</h2>
          <div className="table-container">
            <Table
              className="centerMgnt-list-table"
              expandedRowRender={record => (
                <p style={{ margin: 0 }}>{record.programme_name}</p>
              )}
              dataSource={dataSearch}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
