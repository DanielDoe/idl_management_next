import React from "react";

export default React.createContext({
  venue: [
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
  ],
  addVenueElements: venue => {},
  removeVenueElements: venue => {},
  updateVenueElements: venue => {}
});
