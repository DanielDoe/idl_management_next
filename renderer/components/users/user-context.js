import React from "react";

export default React.createContext({
  users: [
    {
      email: "Accra",
      password: "ACC",
      center: "ACC",
      status: "sumn",
    },
    {
      email: "Accra",
      password: "ACC",
      center: "ACC",
      status: "sumn",
    },
    {
      email: "Accra",
      password: "ACC",
      center: "ACC",
      status: "sumn",
    },
  ],
  addUsersElements: user => {},
  removeUsersElements: user => {},
  updateUsersElements: user => {}
});
