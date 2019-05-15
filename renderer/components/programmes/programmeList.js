import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col } from 'antd';
import ProgrammeContext from './programme-context';

const Search = Input.Search;

export default props => {
	const dataSource = props.programmes.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const [context, setContext] = useState(useContext(ProgrammeContext));
	const [dataSearch, setdataSearch] = useState(dataSource);

	useEffect(() => {
		// console.log('dataSource length: ', dataSource.length);
		// console.log('dataSearch length: ', dataSearch.length);
		// console.log('Table data: ', dataSearch.length == 0 ? dataSearch : dataSource);
	}, [context]);

	const onSearch = e => {
		// console.log(e.target.value)
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.name.toLowerCase().search(value) !== -1);
		// let newDataSource = (newData.length === 0) ? newData : data
		setdataSearch(newData);
	};

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Programme name', dataIndex: 'name', key: 'name' },
		{ title: 'Code', dataIndex: 'code', key: 'code' },
		{ title: 'Year', dataIndex: 'year', key: 'year' },
		// { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
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
		<div>
			<div>
				<Row>
					<Col span={16} />
					<Col span={8}>
						<Search
							placeholder="search for programme"
							// size="large"
							onChange={e => onSearch(e)}
							style={{ width: '90%' }}
						/>
					</Col>
				</Row>
			</div>
			<div className="programme-list column">
				<div className="list-container">
					<h2>List of Programmes</h2>
					<div className="table-container">
						<Table
							className="programme-list-table"
							dataSource={dataSearch.length == 0 ? dataSearch : dataSource}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
