import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col, Select } from 'antd';
import CenterMgntContext from './centerMgnt-context';

const Search = Input.Search;
const Option = Select.Option;

export default props => {
	const dataSource = props.centerMgnts.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const [context, setContext] = useState(useContext(CenterMgntContext));
	const [dataSearch, setdataSearch] = useState(dataSource);

	useEffect(() => {
		console.log(context);
	}, [context]);

	const onSearch = e => {
		// console.log(e.target.value)
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.name.toLowerCase().search(value) !== -1);
		// let newDataSource = (newData.length === 0) ? newData : data
		setdataSearch(newData);
	};

	const handleChange = value => {
		console.log(`selected ${value}`);
	};

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
		<div>
			<div>
				<Row>
					<Col span={8}>
						<Select placeholder="e.g. Accra" style={{ width: "90%" }} onChange={e => handleChange(e)}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="disabled" disabled>
								Disabled
							</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Col>
					<Col span={8}>
						<Select placeholder="e.g Computer Engineering" style={{ width: "90%" }} onChange={e => handleChange(e)}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="disabled" disabled>
								Disabled
							</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Col>
					<Col span={8}>
						<Search
							placeholder="search for programme/course"
							// size="large"
							onChange={e => onSearch(e)}
							style={{ width: '90%' }}
						/>
					</Col>
				</Row>
			</div>
			<div className="centerMgnt-list column">
				<div className="list-container">
					<h2>Center Allocations</h2>
					<div className="table-container">
						<Table
							className="centerMgnt-list-table"
							dataSource={dataSearch.length == 0 ? dataSearch : dataSource}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
