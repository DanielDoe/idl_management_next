import React from 'react';
import axios from 'axios';

export async function getData(params) {
    //Here i want to get the data then return them to the user.js page
    const res = await axios.get(params.url, { headers: params.headers });
	return res.data;
}

// add new users
export const createUsers = (url, user) => {
	const { full_name, email, status, phone } = user;
	axios({
		method: 'post',
		url: url,
		data: {
			full_name: full_name,
			email: email,
			status: status,
			phone: phone,
			center_id: 1,
		},
		headers: headers,
	});
};

// add new centers
export const createCenters = (url, center) => {
	const { name, code, blocks } = center;
	axios({
		method: 'post',
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
export const createVenues = (url, venue) => {
	const { name, code, blocks } = venue;
	axios({
		method: 'post',
		url: url,
		data: {
			name: name,
			code: code,
			blocks: blocks,
		},
		headers: headers,
	});
};

// update users
export const updateUsers = (url, user) => {
	const { full_name, email, status, phone, id } = user;
	axios({
		method: 'put',
		url: url + '/u_id=' + id,
		data: {
			full_name: full_name,
			email: email,
			status: status,
			phone: phone,
			center_id: 1,
		},
		headers: headers,
		params: { u_id: id },
	});
};

//update centers

export const delUser = (url, user) => {
	const { full_name, email, status, phone, id } = user;
	axios({
		method: 'delete',
		url: url + '?u_id=' + id,
		data: {
			full_name: full_name,
			email: email,
			status: status,
			phone: phone,
			center_id: 1,
		},
		headers: headers,
	});
};

export const getCenters = url => {};
