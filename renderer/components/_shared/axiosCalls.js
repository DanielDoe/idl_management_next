import React from "react";
import axios from "axios";

export async function getData(params) {
  //Here i want to get the data then return them to the user.js page
  const res = await axios.get(params.url, { headers: params.headers });
  return res.data;
}

// add new users
export const manageUsers = params => {
  const { full_name, email, status, phone, url, headers } = params;
  switch (params.type) {
    case "post":
      axios({
        method: "post",
        url: url,
        data: {
          full_name: full_name,
          email: email,
          status: status,
          phone: phone,
          // not sure about center_id
          center_id: center_id,
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
        url: url + "?u_id=" + u_id,
        data: {
          full_name: full_name,
          email: email,
          status: status,
          phone: phone,
          center_id: center_id,
        },
        headers: headers,
      });
    default:
      break;
  }
};

// add new centers
export const createCenters = params => {
  const { name, code, blocks, headers, url } = params;
  axios({
    method: "post",
    url: url,
    data: {
      name: name,
      code: code,
      blocks: blocks,
    },
    headers: headers,
  });
};

//add new venues
export const createVenues = params => {
  const { venue_name, capacity, url, headers, center_id, center } = params;
  axios({
    method: "post",
    url: url,
    data: {
      venue_name: venue_name,
      capacity: capacity,
      center: center,
      center_id: center_id,
    },
    headers: headers,
  });
};

// update users
export const updateUsers = (url, user) => {
  const { full_name, email, status, phone, u_id, center_id } = user;
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
};

//update centers
// update users
export const updateCenters = params => {
  const { full_name, email, status, phone, u_id, center_id } = params;
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
};

export const delUser = (url, user) => {
  const { full_name, email, status, phone, u_id, center_id } = user;
  axios({
    method: "delete",
    url: url + "?u_id=" + u_id,
    data: {
      full_name: full_name,
      email: email,
      status: status,
      phone: phone,
      center_id: center_id,
    },
    headers: headers,
  });
};

export const getCenters = url => {};
