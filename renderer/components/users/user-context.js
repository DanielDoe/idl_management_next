import React from "react";

export default React.createContext({
  users: [
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
  addUsersElements: user => {},
  removeUsersElements: user => {},
  updateUsersElements: user => {}
});
