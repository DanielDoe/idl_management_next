import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UserContext from './user-context';
import { AddUser } from './newUsers';
import UserList from './userList';
import { getData, manageUsers } from '../_shared//axiosCalls';
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
	const [users, setUsers] = useState([]);

	const addUserElements = user => {
		console.log(users)
		// spread the sent values from new user page
		// manageUsers({ ...user, url: routeURL, headers, type: 'post' });
		setUsers([...users, user]);
	};

	const removeUserElements = user => {
		// manageUsers({ ...user, url: routeURL, headers, type: 'delete' });
		const newUsers = users.filter(element => element.email !== user.email);
		// console.log('new users: ', newUsers);
		setUsers(newUsers)
		
	};

	const updateUserElements = user => {
		console.log('Updating Users', user);
		// manageUsers({ ...user, url: routeURL, headers, type: 'put' });
		const newstate = users.map(element => ((element.email === user.email) ? user : element));
		
		console.log(newstate)
		// setUsers(newstate);
	};

	const onValueEditted = value => {
		// console.log(value);
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	//getData({ url: routeURL, headers: headers }).users

	useEffect(() => {
		// Get
		// getData({ url: routeURL, headers }).then(data => {
		// 	(data.users.length !== 0) ? setUsers(data.users) : setUsers([]);
		// });
	}, []);

	return (
		<UserContext.Provider
			value={{
				users: users,
				addUserElements: addUserElements,
				removeUserElements: removeUserElements,
				updateUserElements: updateUserElements,
			}}
		>
			<div style={{ width: '100%' }} id="user">
				<div style={{ height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<UserList users={users} onValueRemoved={removeUserElements} onValueEditted={onValueEditted} />
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
