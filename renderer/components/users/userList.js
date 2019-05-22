import React, { useState, useEffect, useContext } from 'react';
import { Input, Table } from 'antd';
import UserContext from './user-context';

const Search = Input.Search;

export default props => {
	const dataSource = props.users.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const context = useContext(UserContext);
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);
	
	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
		console.log(context)
	}, [height, width]);

	useEffect(() => {
		const dataSource = props.users.map((elem, id) => {
			return {
				...elem,
				key: id,
				sn: id + 1,
			};
		});
		setdataSearch(dataSource)
	}, [props.users])

	const onSearch = e => {
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.full_name.search(value) !== -1);
		setdataSearch(newData);
	};

	// props.onEditClicked

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Fullname', dataIndex: 'full_name', key: 'full_name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Center', dataIndex: 'center_name', key: 'center_name' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onValueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => props.onValueRemoved(record)}>
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
					<Table
						loading={dataSource.length !== 0 ? false : true}
						className="user-list-table"
						dataSource={dataSearch}
						columns={columns}
					/>
				</div>
			</div>
		</div>
	);
};
