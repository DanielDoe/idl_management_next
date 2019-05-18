import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UserContext from './user-context';
import { AddUser } from './newUsers';
import UserList from './userList';
import { getData, manageUsers, titleCase } from '../_shared//axiosCalls';
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

	const routeURL = 'http://10.30.3.17:5000/user';
	const routeCenters = 'http://10.30.3.17:5000/center';
	const [users, setUsers] = useState([]);
	const addUserElements = user => {
		// spread the sent values from new user page
		// manageUsers({ ...user, url: routeURL, headers, type: 'post' });
		let newstate = {
			center: user.center,
			email: user.email,
			full_name: titleCase(user.full_name),
			phone: user.phone,
			status: user.status,
		};
		setUsers([...users, newstate]);
	};

	const removeUserElements = user => {
		// manageUsers({ ...user, url: routeURL, headers, type: 'delete' });
		const newUsers = users.filter(element => element.email !== user.email);
		// console.log('new users: ', newUsers);
		setUsers(newUsers);
	};

	const updateUserElements = user => {
		console.log('Updating Users', user);
		// manageUsers({ ...user, url: routeURL, headers, type: 'put' });
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
		getData({ url: routeURL, headers }).then(data => {
			data.users.length !== 0 ? setUsers(data.users) : setUsers([]);
		});

		// Get all the centers we need
		getData({ url: routeCenters, headers }).then(data => {
			data.centers.length !== 0 ? setcenters(data.centers) : setcenters([]);
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
