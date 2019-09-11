import axios from "axios";

export const routeProgrammes = "https://idl-timetable.herokuapp.com/programme";
export const routeCourses = "https://idl-timetable.herokuapp.com/course";
export const routeAllocations =
  "https://idl-timetable.herokuapp.com/courseAllocation";
export const routeUserLogin = "https://idl-timetable.herokuapp.com/userlogin";
export const routeCenters = "https://idl-timetable.herokuapp.com/center";
export const routeUsers = "https://idl-timetable.herokuapp.com/user";
export const routeStudents = "https://idl-timetable.herokuapp.com/student";
export const routeVenues = "https://idl-timetable.herokuapp.com/venue";
export const routeProgrammeCenters =
  "https://idl-timetable.herokuapp.com/programmecenter";
export const routeTeachingTimeTable =
  "https://idl-timetable.herokuapp.com/teachingTimeTable";
export const routeTimeTableItem =
  "https://idl-timetable.herokuapp.com/teachingTimeTableItem";
export const routeExamTimetable =
  "https://idl-timetable.herokuapp.com/examtimetable";
export const routeExamTimeTableItem =
  "https://idl-timetable.herokuapp.com/examtimetableItem";

export const titleCase = str => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export async function getData(params) {
  //Here i want to get the data then return them to the user.js page
  const res = await axios.get(params.url, { headers: params.headers });
  return res.data;
}

/**
 *
 * manage users :
 * add new users
 * update users
 * delete users
 */
export async function manageUsers(params) {
  const {
    full_name,
    email,
    public_id,
    center_name,
    status,
    phone,
    url,
    headers,
  } = params;
  switch (params.type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          full_name: full_name,
          email: email,
          status: status,
          phone: phone,
          center_name: center_name,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          full_name: full_name,
          email: email,
          status: status,
          phone: phone,
          center_name: center_name,
          public_id: public_id,
        },
        headers: headers,
        // params: { u_id: id },
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        data: {
          public_id: public_id,
        },
        headers: headers,
      });
    default:
      break;
  }
}

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 *
 *
 * this right here is good and ready to go
 */
export async function manageCenters(params) {
  const {
    center_name,
    center_code,
    center_block,
    center_id,
    url,
    headers,
    type,
  } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          center_name: center_name,
          center_code: center_code,
          center_block: center_block,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          center_id: center_id,
          center_name: center_name,
          center_code: center_code,
          center_block: center_block,
        },
        headers: headers,
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        headers: headers,
        data: {
          center_id: center_id,
        },
      });
    default:
      break;
  }
}

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export async function manageVenues(params) {
  const {
    venue_name,
    venue_id,
    venue_capacity,
    center_name,
    url,
    headers,
    type,
  } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          venue_name: venue_name,
          venue_capacity: venue_capacity,
          center_name: center_name,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          venue_id: venue_id,
          venue_name: venue_name,
          venue_capacity: venue_capacity,
          center_name: center_name,
        },
        headers: headers,
        // params: { u_id: id },
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        headers: headers,
        data: {
          venue_name: venue_name,
          center_name: center_name,
        },
      });
    default:
      break;
  }
}

/**
 *
 * manage courses :
 * add new courses
 * update courses
 * delete courses
 */

export async function manageCourses(params) {
  const {
    course_id,
    course_code,
    course_title,
    semester,
    year,
    url,
    headers,
    type,
  } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          course_code: course_code,
          course_title: course_title,
          semester: semester,
          year: year,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          course_id: course_id,
          course_code: course_code,
          course_title: course_title,
          semester: semester,
          year: year,
        },
        headers: headers,
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        headers: headers,
        data: {
          course_id: course_id,
        },
      });
    default:
      break;
  }
}

/**
 *
 * manage programmes :
 * add new programmes
 * update programmes
 * delete programmes
 */

export async function manageProgrammes(params) {
  const {
    programme_name,
    programme_code,
    year,
    programme_id,
    url,
    headers,
    type,
  } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          programme_name: programme_name,
          programme_code: programme_code,
          year: year,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          programme_id: programme_id,
          programme_name: programme_name,
          programme_code: programme_code,
          year: year,
        },
        headers: headers,
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        headers: headers,
        data: {
          programme_id: programme_id,
        },
      });
    default:
      break;
  }
}

/**
 *
 * manage courseAllocations :
 * add new courseAllocations
 * update courseAllocations
 * delete courseAllocations
 */

export async function manageCourseAllocations(params) {
  const { programme_id, sem_1, sem_2, url, headers, type } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          programme_id: programme_id,
          sem_1: sem_1,
          sem_2: sem_2,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          programme_id: programme_id,
          sem_1: sem_1,
          sem_2: sem_2,
        },
        headers: headers,
        // params: { u_id: id },
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        data: {
          programme_id: programme_id,
        },
        headers: headers,
      });
    default:
      break;
  }
}

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export async function manageScripts(params) {
  const { url, headers, type } = params;
  switch (type) {
    case "post":
      axios({
        method: "post",
        url: url,
        data: {
          center_name: center_name,
          // center_id: center_name,
          center_code: center_code,
          center_block: center_block,
        },
        headers: headers,
      });
      break;
    case "put":
      axios({
        method: "put",
        url: url + "/u_id=" + u_id,
        data: {
          full_name: full_name,
          email: email,
          status: status,
          phone: phone,
          center_id: center_id,
        },
        headers: headers,
        // params: { u_id: id },
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url + "?center_id=" + center_id,
        headers: headers,
      });
    default:
      break;
  }
}

/**
 *
 * manage students :
 * add new students
 * update students
 * delete students
 */

export async function manageStudents(params) {
  const { email, student_name, index_number, ref_number, prog_cen_id,  url, headers, type } = params;
  switch (type) {
    case "post":
      const request = axios({
        method: "post",
        url: url,
        data: {
          student_name: student_name,
          email: email,
          index_number: index_number,
          ref_number: ref_number,
          prog_cen_id: prog_cen_id,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url + "/u_id=" + ref_number,
        data: {
          full_name: full_name,
          email: email,
          status: status,
          phone: phone,
          center_id: center_id,
        },
        headers: headers,
        // params: { u_id: id },
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url + "?ref_number=" + ref_number,
        headers: headers,
      });
    default:
      break;
  }
}

// exams time table
export async function manageExamsTimetable(params) {
  const {
    date,
    exam_timetable_id,
    day,
    end_time,
    start_time,
    exam_type,
    type,
    semester,
    url,
    headers,
  } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          date: date,
          day: day,
          end_time: end_time,
          type: exam_type,
          //   exam_timetable_id: exam_timetable_id,
          semester: 1,
          start_time: start_time,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          timetable_id: timetable_id,
          prog_cen_id: prog_cen_id,
          semester: semester,
        },
        headers: headers,
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        data: {
          exam_timetable_id: exam_timetable_id,
        },
        headers: headers,
      });
    default:
      break;
  }
}

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export async function manageTeachingTimetable(params) {
  const { prog_cen_id, timetable_id, semester, url, headers, type } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          prog_cen_id: prog_cen_id,
          semester: semester,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          timetable_id: timetable_id,
          prog_cen_id: prog_cen_id,
          semester: semester,
        },
        headers: headers,
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        data: {
          timetable_id: timetable_id,
        },
        headers: headers,
      });
    default:
      break;
  }
}

/**
 * 
 * 
 * 
 "timetable_id": "1",
	"date": "26/06/2019",
	"timetable_item_title": "COE1 BLock One", 
	"start_time": "8:00", 
	"end_time": "14:00", 
	"course_id": "1", 
	"venue_id": "1",
	"block": "Block One"
 */

export async function manageTeachingTimetableItem(params) {
  const {
    date,
    timetable_id,
    timetable_item_id,
    timetable_item_title,
    course_id,
    venue_id,
    block,
    start_time,
    end_time,
    url,
    headers,
    type,
  } = params;
  switch (type) {
    case "get":
      const res = await axios.get(
        params.url + `?timetable_id=${timetable_id}`,
        { headers: params.headers }
      );
      return res.data;
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          timetable_id: timetable_id,
          date: date,
          timetable_item_title: timetable_item_title,
          start_time: start_time,
          end_time: end_time,
          course_id: course_id,
          venue_id: venue_id,
          block: block,
        },
        headers: headers,
      });
      return request;

    case "put":
      const put_data = await axios({
        method: "put",
        url: url,
        data: {
          timetable_item_id: timetable_item_id,
          timetable_id: timetable_id,
          date: date,
          timetable_item_title: timetable_item_title,
          start_time: start_time,
          end_time: end_time,
          course_id: course_id,
          venue_id: venue_id,
          block: block,
        },
        headers: headers,
      });
      return put_data;

    case "delete":
      const delete_data = await axios({
        method: "delete",
        url: url,
        data: {
          timetable_item_id: timetable_item_id,
          timetable_id: timetable_id,
        },
        headers: headers,
      });
      return delete_data;

    default:
      break;
  }
}

// exams table items
export async function manageExamTimetableItem(params) {
  const {
    exam_timetable_item_id,
    semester,
    courses,
    exam_timetable_id,
    url,
    headers,
    type,
  } = params;

  switch (type) {
    case "get":
      const res = await axios.get(
        params.url +
          `?exam_timetable_id=${exam_timetable_id}&semester=${semester}`,
        { headers: params.headers }
      );
      return res.data;
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          exam_timetable_id: 1,
          semester: 1,
          courses: courses,
        },
        headers: headers,
      });
      return request;

    case "put":
      const put_data = await axios({
        method: "put",
        url: url,
        data: {
          exam_timetable_id: exam_timetable_id,
          semester: semester,
          courses: courses,
        },
        headers: headers,
      });
      return put_data;

    case "delete":
      const delete_data = await axios({
        method: "delete",
        url: url,
        data: {
          timetable_item_id: timetable_item_id,
          timetable_id: timetable_id,
        },
        headers: headers,
      });
      return delete_data;

    default:
      break;
  }
}

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export async function manageProgrammeCenter(params) {
  const {
    center_id,
    programme_id,
    prog_cen_id,
    capacity,
    url,
    headers,
    type,
  } = params;
  switch (type) {
    case "post":
      const request = await axios({
        method: "post",
        url: url,
        data: {
          center_id: center_id,
          // center_id: center_name,
          programme_id: programme_id,
          capacity: capacity,
        },
        headers: headers,
      });
      return request;
    case "put":
      axios({
        method: "put",
        url: url,
        data: {
          center_id: center_id,
          prog_cen_id: prog_cen_id,
          programme_id: programme_id,
          capacity: capacity,
        },
        headers: headers,
      });
      break;

    case "delete":
      axios({
        method: "delete",
        url: url,
        data: {
          prog_cen_id: prog_cen_id,
        },
        headers: headers,
      });
    default:
      break;
  }
}
