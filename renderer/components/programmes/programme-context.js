import React from "react";

export default React.createContext({
  programme: [
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
  addProgrammeElements: programme => {},
  removeProgrammeElements: programme => {},
  updateProgrammeElements: programme => {}
});
