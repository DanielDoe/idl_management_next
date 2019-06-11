import React from "react";

export default React.createContext({
  // get request to the db for available venues
  user: [],
//   venues: [],
//   // get request to the db for available venues
//   centers: [],
//   user: [],
  programmes: [],
  addExamElements: exams => {},
  removeExamElements: exams => {},
  updateExamElements: exams => {},
});