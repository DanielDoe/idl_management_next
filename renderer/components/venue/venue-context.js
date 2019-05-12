import React from "react";

export default React.createContext({
  // get request to the db for available venues
  user: [],
  venues: [
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
  ],
  // get request to the db for available venues
  centers: [{
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
  }],
  addVenueElements: venue => {},
  removeVenueElements: venue => {},
  updateVenueElements: venue => {}
});
