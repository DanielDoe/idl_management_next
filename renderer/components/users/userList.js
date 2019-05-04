import React, { useState, useEffect, useContext } from 'react';
import { Input, Table } from 'antd';
import UserContext from './user-context';

const Search = Input.Search;

export default () => {
	const [context, setContext] = useState(useContext(UserContext));
    
	useEffect(() => {
		console.log(context);
	}, [context]);

	// onSearch = e => {
	// 	const value = e.target.value.toLowerCase();
	// 	const newData = this.props.dataSource.filter(s => s.session_counr.search(value) !== -1);
	// 	this.setState({ dataSource: newData });
	// };
	const dataSource = context.users.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Password', dataIndex: 'password', key: 'password' },
		{ title: 'Center', dataIndex: 'center', key: 'center' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => this.props.onEditClicked(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => this.props.onDeleteClicked(record)}>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<div className="user-list column">
			<div className="list-container">
				<h2>List of Users</h2>
				<div className="table-container">
					<Table className="user-list-table" dataSource={dataSource} columns={columns} />
				</div>
			</div>
		</div>
	);
};