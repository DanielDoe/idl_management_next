import React from "react";

export default React.createContext({
  credentials: [],
  addCredentialsElements: credential => {},
  removeCredentialsElements: credential => {},
  updateCredentialsElements: credential => {}
});