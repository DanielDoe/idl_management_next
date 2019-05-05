import React from "react";

export default React.createContext({
  courses: [
    {
      title: "Accra",
      code: "ACC",
      semester: "One",
      year: 1
    },
    {
      title: "Accra",
      code: "ACC",
      semester: "One",
      year: 1
    },
    {
      title: "Accra",
      code: "ACC",
      semester: "One",
      year: 1
    },
  ],
  programmes: ['Computer Enginering 1', 'Computer Engineering 2', 'Computer Engineering 3'],
  courses: ['Basic Electronics', 'C Programming', 'Database Systems'],
  addCourseElements: course => {},
  removeCourseElements: course => {},
  updateCourseElements: course => {}
});
