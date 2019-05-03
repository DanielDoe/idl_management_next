import React from "react";

export default React.createContext({
  courses: [
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
  addCourseElements: course => {},
  removeCourseElements: course => {},
  updateCourseElements: course => {}
});
