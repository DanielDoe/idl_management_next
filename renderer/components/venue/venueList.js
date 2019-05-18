import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col, Select } from 'antd';
import VenueContext from './venue-context';
// import swal from '@sweetalert/with-react'

const Search = Input.Search;

export default props => {
	const context = useContext(VenueContext);
	const [center, setcenter] = useState('');
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

	const renderCenterData = () => {
		const elements = this.props.centers.map((element, index) => {
			// console.log(element.name);
			return (
				<Option value={element.center_name} key={element.center_name + index}>
					{element.center_name}
				</Option>
			);
		});

		return elements;
	};

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
		<div>
			<div>
				<Row gutter={16}>
					<Col span={8}>
						<Select
							value={context.user.auth_status !== 'admin' ? context.user.center : 'Accra'}
							disabled={context.user.auth_status !== 'admin' ? true : false}
							// placeholder="e.g. Accra"
							style={{ width: '90%' }}
							onChange={e => setcenter(e.target.value)}
						>
							{renderCenterData}
						</Select>
					</Col>
					<Col span={8} />
					<Col span={8}>
						<Search
							placeholder="search for programme/course"
							// size="large"
							// onChange={e => onSearch(e)}
							style={{ width: '90%' }}
						/>
					</Col>
				</Row>
			</div>
			<div className="venue-list column">
				<div className="list-container">
					<h2>List of Venues</h2>
					<div className="table-container">
						<Table className="venue-list-table" dataSource={dataSource} columns={columns} />
					</div>
				</div>
			</div>
		</div>
	);
};
