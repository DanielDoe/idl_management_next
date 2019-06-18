import React from "react";

export default React.createContext({
  // programmes: ['Computer Enginering 1', 'Computer Engineering 2', 'Computer Engineering 3'],
  students: [],
  addStudentElements: student => {},
  removeStudentElements: student => {},
  updateStudentElements: student => {}
});
