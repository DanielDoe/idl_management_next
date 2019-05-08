import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import AllocationContext from "./allocation-context";
import { AddAllocation } from "./newAllocation";
import AllocationList from "./allocationList";
import "./allocation.css";

export default () => {
  const [allocations, setAllocations] = useState([
    {
      name: "Computer Engineering 1",
      courses: [
        "Basic Electronics",
        "C Programming",
        "Database Systems",
        "Basic Electronics",
        "C Programming",
        "Database Systems",
        "C Programming",
        "Database Systems",
      ],
    },
    {
      name: "Computer Engineering 2",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering 1",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering 2",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering 1",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering 2",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
    {
      name: "Computer Engineering",
      courses: ["Basic Electronics", "C Programming", "Database Systems"],
    },
  ]);
  const [programmes, setprogrammes] = useState([
    "Computer Enginering 1",
    "Computer Engineering 2",
    "Computer Engineering 3",
  ]);
  const [courses, setcourses] = useState([
    "Basic Electronics",
    "C Programming",
    "Database Systems",
  ]);
  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);
  const addAllocationElements = allocation => {
    // updatedAllocations = Allocations
    // setAllocations(newAllocation);
    let newAllocation = [];
    console.log("Adding Allocations", newAllocation);
    // setAllocations(Allocations.push(Allocation))
  };

  const removeAllocationElements = allocation => {
    console.log("Removing Allocations", allocation);
  };

  const updateAllocationElements = allocation => {
    console.log("Updating Allocations", allocation);
  };

  const onValueEditted = value => {
    seteditMode(true);
    setfieldData(value);
  };

  const triggerEditmode = () => {
    seteditMode(false);
  };

  useEffect(() => {
    console.log("State updated!: ");
  }, [allocations, programmes, courses]);

  return (
    <AllocationContext.Provider
      value={{
        allocations: allocations,
        programmes: programmes,
        courses: courses,
        addAllocationElements: addAllocationElements,
        removeAllocationElements: removeAllocationElements,
        updateAllocationElements: updateAllocationElements,
      }}
    >
      <div style={{ width: "100%" }} id="allocation">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <AllocationList
                allocations={allocations}
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
              <AddAllocation
                editMode={editMode}
                onCancel={triggerEditmode}
                fieldData={fieldData}
                onValueEditted={onValueEditted}
              />
            </Col>
          </Row>
        </div>
      </div>
    </AllocationContext.Provider>
  );
};
