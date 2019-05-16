import React from 'react';
import axios from 'axios';

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
export const manageUsers = params => {
	const { full_name, email, status, phone, url, headers } = params;
	switch (params.type) {
		case 'post':
			axios({
				method: 'post',
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
};

/**
 *
 * manage centers :
 * add new centers
 * update centers
 * delete centers
 */
export const manageCenters = params => {
	const { center_name, center_code, center_block, center_id, url, headers, type } = params;
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
