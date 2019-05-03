import React, { useState } from "react";
import { Row, Col } from "antd";
import VenueContext from "./venue-context";
import { AddVenue } from "./newVenue";
import VenueList from "./venueList";
import "./venue.css";

export default () => {
  const [venues, setVenues] = useState([
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

  const addVenueElements = venue => {
    console.log("Adding venue", venue);
  };

  const removeVenueElements = venue => {
    console.log("Removing venue", venue);
  };

  const updateVenueElements = venue => {
    console.log("Updating venue", venue);
  };

  return (
    <VenueContext.Provider
      value={{
        venues: venues,
        addVenueElements: addVenueElements,
        removeVenueElements: removeVenueElements,
        updateVenueElements: updateVenueElements,
      }}
    >
      <div style={{ width: "100%" }} id="venue">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <VenueList />
            </Col>
            <Col span={8} style={{ height: "100%", borderLeft: "1px solid rgba(0,0,0,0.12)" }}>
              <AddVenue />
            </Col>
          </Row>
        </div>
      </div>
    </VenueContext.Provider>
  );
};