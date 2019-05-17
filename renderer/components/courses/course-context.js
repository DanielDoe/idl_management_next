import React from "react";

export default React.createContext({
  // programmes: ['Computer Enginering 1', 'Computer Engineering 2', 'Computer Engineering 3'],
  courses: [],
  addCourseElements: course => {},
  removeCourseElements: course => {},
  updateCourseElements: course => {}
});
