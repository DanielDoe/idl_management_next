import React, { useState, useEffect, useContext } from 'react';
import { Input, Table } from 'antd';
import CenterMgntContext from './centerMgnt-context';

const Search = Input.Search;

export default (props) => {
	const [context, setContext] = useState(useContext(CenterMgntContext));
    
	useEffect(() => {
		console.log(context);
	}, [context]);

	// onSearch = e => {
	// 	const value = e.target.value.toLowerCase();
	// 	const newData = this.props.dataSource.filter(s => s.session_counr.search(value) !== -1);
	// 	this.setState({ dataSource: newData });
	// };
	const dataSource = props.centerMgnts.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Course code', dataIndex: 'name', key: 'name' },
		{ title: 'Course name', dataIndex: 'course', key: 'course' },
		{ title: 'Programme', dataIndex: 'year', key: 'year' },
		{ title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onValueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeCenterMgntElements(record)}>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<div className="centerMgnt-list column">
			<div className="list-container">
				<h2>Center Allocations</h2>
				<div className="table-container">
					<Table className="centerMgnt-list-table" dataSource={dataSource} columns={columns} />
				</div>
			</div>
		</div>
	);
};
