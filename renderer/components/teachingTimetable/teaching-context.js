import React from "react";

export default React.createContext({
  // get request to the db for available venues
  user: [],
  venues: [],
  // get request to the db for available venues
  centers: [],
  user: [],
  programmes: [],
  addTeachingElements: teaching => {},
  removeTeachingElements: teaching => {},
  updateTeachingElements: teaching => {},
});
