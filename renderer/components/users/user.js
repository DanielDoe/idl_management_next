import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import UserContext from './user-context';
import { AddUser } from './newUsers';
import UserList from './userList';
import { getData } from '../_shared//axiosCalls';
import './user.css';

export default () => {
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const center = JSON.parse(localStorage.getItem('login')).center;
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};

	const routeURL = 'http://10.30.3.17:5000/user';
	const [users, setUsers] = useState([]);

	const addUserElements = user => {
		const { full_name, email, status, phone } = user;
		getData({ url: routeURL, headers })
			.then(data => {
				setUsers(data.users)
			});
		console.log('Adding Users', full_name, email, status, phone);
	};

	const removeUserElements = user => {
		console.log('Removing Users', User);
	};

	const updateUserElements = user => {
		console.log('Updating Users', user);
	};

	const onValueEditted = value => {
		console.log(value)
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	//getData({ url: routeURL, headers: headers }).users

	useEffect(() => {
		// console.log(token)
		// Try this instead
		getData({ url: routeURL, headers })
			.then(data => {
				setUsers(data.users)
			});
			// nothing got returned 
		console.log('axios data: ', users);
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
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<UserList users={users} onValueEditted={onValueEditted} />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddUser editMode={editMode}
							onCancel={triggerEditmode}
							fieldData={fieldData}
							// onListUpload={openFileDialog}
							onValueEditted={onValueEditted}/>
						</Col>
					</Row>
				</div>
			</div>
		</UserContext.Provider>
	);
};
