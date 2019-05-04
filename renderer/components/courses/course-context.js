import React from "react";

export default React.createContext({
  courses: [
    {
      title: "Accra",
      code: "ACC",
      semester: "One",
      year: "1"
    },
    {
      title: "Accra",
      code: "ACC",
      semester: "One",
      year: "1"
    },
    {
      title: "Accra",
      code: "ACC",
      semester: "One",
      year: "1"
    },
  ],
  addCourseElements: course => {},
  removeCourseElements: course => {},
  updateCourseElements: course => {}
});
