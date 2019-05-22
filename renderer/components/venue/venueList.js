import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col, Select } from 'antd';
import VenueContext from './venue-context';
// import swal from '@sweetalert/with-react'

const Search = Input.Search;
const Option = Select.Option;
export default props => {
	const dataSource = props.venues.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const context = useContext(VenueContext);
	const [center, setcenter] = useState('');
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);

	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
	}, [height, width]);

	useEffect(() => {
		console.log('Venues: ', props.venues);
		const dataSource = props.venues.map((elem, id) => {
			return {
				...elem,
				key: id,
				sn: id + 1,
			};
		});
		setdataSearch(dataSource);
	}, [props.venues]);

	const onSearch = e => {
		// console.log(e.target.value)
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.course_title.toLowerCase().search(value) !== -1);
		// let newDataSource = (newData.length === 0) ? newData : data
		setdataSearch(newData);
	};

	const renderCenterData = () => {
		const elements = context.centers.map((element, index) => {
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
		{ title: 'Center', dataIndex: 'center_name', key: 'center_name' },
		{ title: 'Room', dataIndex: 'venue_name', key: 'venue_name' },
		// { title: 'Year', dataIndex: 'year', key: 'year' },
		{ title: 'Capacity', dataIndex: 'venue_capacity', key: 'venue_capacity' },
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
							onChange={value => setcenter(value)}
						>
							{renderCenterData()}
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
						<Table
							// loading={dataSearch.length !== 0 ? false : true}
							className="venue-list-table"
							dataSource={dataSearch}
							pagination={{ pageSize: height / 100 }}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
