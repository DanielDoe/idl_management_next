import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UserContext from './user-context';
import { AddUser } from './newUsers';
import UserList from './userList';
import { getData, manageUsers, titleCase, routeCenters, routeUsers } from '../_shared//axiosCalls';
import './user.css';

export default () => {
	/**
	 * react hooks declarations
	 * the first two declaration helps track editing oe adding mode
	 *
	 * token and center are stored in the localstorage after login
	 *  */

	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const center = JSON.parse(localStorage.getItem('login')).center;
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};
	const [centers, setcenters] = useState([]);

	const [users, setUsers] = useState([]);
	const addUserElements = user => {
		const { center_name, email, full_name, phone, status } = user;
		// spread the sent values from new user page
		let newstate = {
			center_name: center_name,
			email: email.trim(),
			full_name: titleCase(full_name).trim(),
			phone: `0${phone}`,
			status: status,
		};
		console.log('new: ', newstate);
		manageUsers({ ...newstate, url: routeUsers, headers, type: 'post' }).then(res => {
			console.log(res)
			res.data.users !== undefined ? setUsers(res.data.users) : setUsers([])
		})
		
	};

	const removeUserElements = user => {
		manageUsers({ ...user, url: routeUsers, headers, type: 'delete' });
		const newUsers = users.filter(element => element.email !== user.email);
		// console.log('new users: ', newUsers);
		setUsers(newUsers);
	};

	const updateUserElements = user => {
		console.log('Updating Users', user);
		// manageUsers({ ...user, url: routeUsers, headers, type: 'put' });
		const newstate = users.map(element => (element.email === user.email ? user : element));

		setUsers(newstate);
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		// Get all the required data we need eg. users and centers
		getData({ url: routeUsers, headers }).then(data => {
			console.log(data);
			data.users !== undefined ? setUsers(data.users) : setUsers([]);
		});

		// Get all the centers we need
		getData({ url: routeCenters, headers }).then(data => {
			setcenters(data.centers);
		});
	}, []);

	return (
		<UserContext.Provider
			value={{
				users: users,
				centers: centers,
				addUserElements: addUserElements,
				removeUserElements: removeUserElements,
				updateUserElements: updateUserElements,
			}}
		>
			<div style={{ width: '100%' }} id="user">
				<div style={{ height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<UserList
								users={users}
								onValueRemoved={removeUserElements}
								onValueEditted={onValueEditted}
							/>
						</Col>
						<Col
							span={8}
							style={{
								height: '100%',
								borderLeft: '1px solid rgba(0,0,0,0.12)',
							}}
						>
							<AddUser
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								centers={centers}
								// onListUpload={openFileDialog}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</UserContext.Provider>
	);
};
