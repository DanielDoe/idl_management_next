import React from "react";

export default React.createContext({
  allocations: [
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
  addAllocationElements: allocation => {},
  removeAllocationElements: allocation => {},
  updateAllocationElements: allocation => {}
});
