import React from 'react';
import axios from 'axios';

export const routeProgrammes = 'https://idl-timetable.herokuapp.com/programme';
export const routeCourses = 'https://idl-timetable.herokuapp.com/course';
export const routeAllocations = 'https://idl-timetable.herokuapp.com/courseAllocation';
export const routeUserLogin = 'https://idl-timetable.herokuapp.com/userlogin';
export const routeCenters = 'https://idl-timetable.herokuapp.com/center';
export const routeUsers = 'https://idl-timetable.herokuapp.com/user';
export const routeVenues = 'https://idl-timetable.herokuapp.com/venue';
export const routeProgrammeCenters = 'https://idl-timetable.herokuapp.com/programmecenter';
export const routeTeachingTimeTable = 'https://idl-timetable.herokuapp.com/teachingTimeTable';

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
	const { full_name, email, public_id, center_name, status, phone, url, headers } = params;
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
					center_name: center_name,
				},
				headers: headers,
			});
			return request;
		case 'put':
			axios({
				method: 'put',
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

		case 'delete':
			axios({
				method: 'delete',
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
	const { venue_name, venue_id, venue_capacity, center_name, url, headers, type } = params;
	switch (type) {
		case 'post':
			const request = await axios({
				method: 'post',
				url: url,
				data: {
					venue_name: venue_name,
					venue_capacity: venue_capacity,
					center_name: center_name,
				},
				headers: headers,
			});
			return request;
		case 'put':
			axios({
				method: 'put',
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

		case 'delete':
			axios({
				method: 'delete',
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
	const { course_id, course_code, course_title, semester, year, url, headers, type } = params;
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
					course_id: course_id,
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
		case 'post':
			const request = await axios({
				method: 'post',
				url: url,
				data: {
					programme_id: programme_id,
					sem_1: sem_1,
					sem_2: sem_2,
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
					sem_1: sem_1,
					sem_2: sem_2,
				},
				headers: headers,
				// params: { u_id: id },
			});
			break;

		case 'delete':
			axios({
				method: 'delete',
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
		case 'post':
			const request = await axios({
				method: 'post',
				url: url,
				data: {
					prog_cen_id: prog_cen_id,
					semester: semester,
				},
				headers: headers,
			});
			return request;
		case 'put':
			axios({
				method: 'put',
				url: url,
				data: {
					timetable_id: timetable_id,
					prog_cen_id: prog_cen_id,
					semester: semester,
				},
				headers: headers,
			});
			break;

		case 'delete':
			axios({
				method: 'delete',
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
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */

export async function manageProgrammeCenter(params) {
	const { center_id, programme_id, prog_cen_id, capacity, url, headers, type } = params;
	switch (type) {
		case 'post':
			const request = await axios({
				method: 'post',
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
		case 'put':
			axios({
				method: 'put',
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

		case 'delete':
			axios({
				method: 'delete',
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
