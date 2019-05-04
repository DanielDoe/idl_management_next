import React, { useState } from "react";
import { Row, Col } from "antd";
import ProgrammeContext from "./programme-context";
import { AddProgramme } from "./newProgramme";
import ProgrammeList from "./programmeList";
import "./programme.css";

export default () => {
  const [programmes, setProgrammes] = useState([
    {
      name: "Accra",
      code: "ACC",
    },
    {
      name: "Volta",
      code: "VR",
    },
    {
      name: "Kumasi",
      code: "KMA",
    },
  ]);

  const addProgrammeElements = programme => {
    console.log("Adding Programmes", programme);
  };

  const removeProgrammeElements = programme => {
    console.log("Removing Programmes", programme);
  };

  const updateProgrammeElements = programme => {
    console.log("Updating Programmes", programme);
  };

  return (
    <ProgrammeContext.Provider
      value={{
        programmes: programmes,
        addProgrammeElements: addProgrammeElements,
        removeProgrammeElements: removeProgrammeElements,
        updateProgrammeElements: updateProgrammeElements,
      }}
    >
      <div style={{ width: "100%" }} id="programme">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <ProgrammeList />
            </Col>
            <Col span={8} style={{ height: "100%", borderLeft: "1px solid rgba(0,0,0,0.12)" }}>
              <AddProgramme />
            </Col>
          </Row>
        </div>
      </div>
    </ProgrammeContext.Provider>
  );
};
