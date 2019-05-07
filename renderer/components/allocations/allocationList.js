import React, { useState, useEffect, useContext } from "react";
import { Input, Table, Row, Col, Card } from "antd";
import AllocationContext from "./allocation-context";

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
      <div className="rowCard" style={{ height: "100%", width: "100%", overflowY: 'auto', border:"1px solid rgba(0,0,0,0.14)"}}>
        {props.allocations.map((element, index) => {
          return (
            <div className="columnCard" key={element+index}>
              <div className="cardView">
                <h3>{element.name}</h3>
                  {element.courses.map((elem, index) => {
                    return <p key={elem+index}>{elem}</p>
                  })}
              </div>
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
      <div className="list-container" style={{ height: "100%"}}>
        <h2>List of Allocations</h2>
        <div className="table-container" >
          {/* <Table className="allocation-list-table" dataSource={dataSource} columns={columns} /> */}
          {renderAllocations()}
        </div>
      </div>
    </div>
  );
};
