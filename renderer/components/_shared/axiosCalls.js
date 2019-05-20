import React from 'react';
import axios from 'axios';

export const titleCase = str => {
	return str
		.toLowerCase()
		.split(' ')
		.map(function(word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
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
	const { full_name, email, center_name, status, phone, url, headers } = params;
	switch (params.type) {
		case 'post':
			const request = await axios({
				method: 'post',
				url: url,
				data: {
					full_name: full_name,
					email: email,
					status: status,
					phone: phone,
					// not sure about center_id
					center_name: center_name,
				},
				headers: headers,
			});
			return request;
		case 'put':
			axios({
				method: 'put',
				url: url + '/u_id=' + u_id,
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?u_id=' + u_id,
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
	const { center_name, center_code, center_block, center_id, url, headers, type } = params;
	switch (type) {
		case 'post':
			const request = await axios({
				method: 'post',
				url: url,
				data: {
					center_name: center_name,
					center_code: center_code,
					center_block: center_block,
				},
				headers: headers,
			});
			return request;
		case 'put':
			axios({
				method: 'put',
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
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

export const manageVenues = params => {
	const { url, headers, type } = params;
	switch (type) {
		case 'post':
			axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
				url: url + '/u_id=' + u_id,
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
				headers: headers,
			});
		default:
			break;
	}
};

/**
 *
 * manage courses :
 * add new courses
 * update courses
 * delete courses
 */

export async function manageCourses(params) {
	const { course_code, course_title, semester, year, url, headers, type } = params;
	switch (type) {
		case 'post':
			const request = await axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
				url: url,
				data: {
					center_id: center_id,
					course_code: course_code,
					course_title: course_title,
					semester: semester,
					year: year,
				},
				headers: headers,
			});
			break;

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
				headers: headers,
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
	const { programme_name, programme_code, year, programme_id, url, headers, type } = params;
	switch (type) {
		case 'post':
			const request = await axios({
				method: 'post',
				url: url,
				data: {
					programme_name: programme_name,
					programme_code: programme_code,
					year: year,
				},
				headers: headers,
			});
			return request;
		case 'put':
			axios({
				method: 'put',
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?programme_id=' + programme_id,
				headers: headers,
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

export const manageCourseAllocations = params => {
	const { url, headers, type } = params;
	switch (type) {
		case 'post':
			axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
				url: url + '/u_id=' + u_id,
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
				headers: headers,
			});
		default:
			break;
	}
};

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export const manageScripts = params => {
	const { url, headers, type } = params;
	switch (type) {
		case 'post':
			axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
				url: url + '/u_id=' + u_id,
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
				headers: headers,
			});
		default:
			break;
	}
};

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export const manageTimetable = params => {
	const { url, headers, type } = params;
	switch (type) {
		case 'post':
			axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
				url: url + '/u_id=' + u_id,
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
				headers: headers,
			});
		default:
			break;
	}
};

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export const manageCenterProgrammes = params => {
	const { url, headers, type } = params;
	switch (type) {
		case 'post':
			axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
				url: url + '/u_id=' + u_id,
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

		case 'delete':
			axios({
				method: 'delete',
				url: url + '?center_id=' + center_id,
				headers: headers,
			});
		default:
			break;
	}
};
