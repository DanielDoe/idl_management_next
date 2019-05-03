import React from "react";

export default React.createContext({
  centers: [
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
  addCenterElements: center => {},
  removeCenterElements: center => {},
  updateCenterElements: center => {}
});
