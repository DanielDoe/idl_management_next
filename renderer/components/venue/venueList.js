import React, { useState, useEffect, useContext } from 'react';
import { Input, Table } from 'antd';
import VenueContext from './venue-context';
// import swal from '@sweetalert/with-react'

const Search = Input.Search;

export default (props) => {
	const [context, setContext] = useState(useContext(VenueContext));
    
	useEffect(() => {
		console.log(context);
	}, [context]);

	// onSearch = e => {
	// 	const value = e.target.value.toLowerCase();
	// 	const newData = this.props.dataSource.filter(s => s.session_counr.search(value) !== -1);
	// 	this.setState({ dataSource: newData });
	// };

	const dataSource = props.venues.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Center', dataIndex: 'center', key: 'center' },
		{ title: 'Room', dataIndex: 'name', key: 'name' },
		// { title: 'Year', dataIndex: 'year', key: 'year' },
		{ title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onVenueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeVenueElements(record)}>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<div className="venue-list column">
			<div className="list-container">
				<h2>List of Venues</h2>
				<div className="table-container">
					<Table className="venue-list-table" dataSource={dataSource} columns={columns} />
				</div>
			</div>
		</div>
	);
};
