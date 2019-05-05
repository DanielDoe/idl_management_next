import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import VenueContext from "./venue-context";
import { AddVenue } from "./newVenue";
import VenueList from "./venueList";
import "./venue.css";



export default () => {
  const [venues, setVenues] = useState([
    {
      center: "Accra",
      name: "Block 2",
      capacity: 50
    },
    {
      center: "Accra",
      name: "Block 2",
      capacity: 50
    },
    {
      center: "Accra",
      name: "Block 2",
      capacity: 50
    },
  ]);

  const [centers, setCenters] = useState(
    // get request to the db for available venues
    [
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
    ]
  );

  useEffect(() => {
    console.log('State updated!: ')
  }, [venues, centers])

  const addVenueElements = venue => {
    let newVenues = [...venues, venue]
    console.log("Venues: ", newVenues)
    setVenues(newVenues);
    // console.log("Adding venue:", venue);
  };

  const removeVenueElements = venue => {
    console.log("Removing venue", venue);
  };

  const updateVenueElements = venue => {
    console.log("Updating venue", venue);
    

    // swal({
    //   text: "Write something here:",
    //   content: VenueEditWrapper,
    //   buttons: {
    //     confirm: {
    //       /*
    //        * We need to initialize the value of the button to
    //        * an empty string instead of "true":
    //        */
    //       value: DEFAULT_INPUT_TEXT,
    //     },
    //   },
    // })
    // .then((value) => {
    //   swal(`You typed: ${value}`);
    // });
  };

  return (
    <VenueContext.Provider
      value={{
        venues: venues,
        centers: centers,
        addVenueElements: addVenueElements,
        removeVenueElements: removeVenueElements,
        updateVenueElements: updateVenueElements,
      }}
    >
      <div style={{ width: "100%" }} id="venue">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <VenueList venues={venues}/>
            </Col>
            <Col
              span={8}
              style={{
                height: "100%",
                borderLeft: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <AddVenue />
            </Col>
          </Row>
        </div>
      </div>
    </VenueContext.Provider>
  );
};
