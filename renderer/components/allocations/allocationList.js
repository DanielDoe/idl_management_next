import React, { useState, useEffect, useContext } from "react";
import { Input, Table, Row, Col, Card, Icon, Button } from "antd";
import AllocationContext from "./allocation-context";
import BookSelf from "../_shared/img/bookshelf.png";

const Search = Input.Search;

export default props => {
  const [context, setContext] = useState(useContext(AllocationContext));

  useEffect(() => {
    console.log(context);
  }, [context]);

  // onSearch = e => {
  // 	const value = e.target.value.toLowerCase();
  // 	const newData = this.props.dataSource.filter(s => s.session_counr.search(value) !== -1);
  // 	this.setState({ dataSource: newData });
  // };
  const dataSource = context.allocations.map((elem, id) => {
    return {
      ...elem,
      key: id,
      sn: id + 1,
    };
  });

  const renderAllocations = () => {
    return (
      <div
        className="rowCard"
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          border: "1px solid rgba(0,0,0,0.14)",
        }}
      >
        {props.allocations.map((element, index) => {
          return (
            <div key={element + index} className="skill-card">
              <header class="skill-card__header">
                <img
                  class="skill-card__icon"
                  src={BookSelf}
                  alt="flaticon-bookself"
                />
              </header>
              <section class="skill-card__body">
                <h2 class="skill-card__title">{element.name}</h2>
                <span class="skill-card__duration">
                  {element.courses.length} Courses Found
                </span>
                <ul class="skill-card__knowledge">
                  {element.courses.map((elem, index) => {
                    return <li key={elem + index}>{elem}</li>;
                  })}
                </ul>
                <Button type="danger" shape="circle" icon="delete" />
              </section>
            </div>
          );
        })}
      </div>
    );
  };

  const columns = [
    { title: "SN", dataIndex: "sn", key: "sn" },
    { title: "Course", dataIndex: "name", key: "name" },
    // { title: 'year', dataIndex: 'code', key: 'code' },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    {
      title: " ",
      render: (text, record) => (
        <div className="action-column grid">
          <button
            className="edit column"
            onClick={() => this.props.onEditClicked(record)}
          >
            Edit
          </button>
          <button
            className="delete column"
            onClick={() => this.props.onDeleteClicked(record)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="allocation-list column">
      <div className="list-container" style={{ height: "100%" }}>
        <h2>List of Allocations</h2>
        <div className="table-container">
          {/* <Table className="allocation-list-table" dataSource={dataSource} columns={columns} /> */}
          {renderAllocations()}
        </div>
      </div>
    </div>
  );
};
