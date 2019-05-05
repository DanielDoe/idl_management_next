import React, { useState, useEffect, useContext } from 'react';
import { Input, Table } from 'antd';
import ProgrammeContext from './programme-context';

const Search = Input.Search;

export default (props) => {
	const [context, setContext] = useState(useContext(ProgrammeContext));
    
	useEffect(() => {
		console.log(context);
	}, [context]);

	// onSearch = e => {
	// 	const value = e.target.value.toLowerCase();
	// 	const newData = this.props.dataSource.filter(s => s.session_counr.search(value) !== -1);
	// 	this.setState({ dataSource: newData });
	// };
	const dataSource = props.programmes.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Programme name', dataIndex: 'name', key: 'name' },
		{ title: 'Code', dataIndex: 'code', key: 'code' },
		{ title: 'Year', dataIndex: 'year', key: 'year' },
		{ title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onValueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeProgrammeElements(record)}>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<div className="programme-list column">
			<div className="list-container">
				<h2>List of Programmes</h2>
				<div className="table-container">
					<Table className="programme-list-table" dataSource={dataSource} columns={columns} />
				</div>
			</div>
		</div>
	);
};
