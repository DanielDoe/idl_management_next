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

	const context = useContext(ProgrammeContext);
	const [dataSearch, setdataSearch] = useState(dataSource);

	useEffect(() => {
		// console.log('dataSource: ', dataSource);
		// console.log('dataSearch: ', dataSearch);
		// console.log('dataSearch length: ', dataSearch.length);
		// console.log('Table data: ', dataSearch.length == 0 ? dataSearch : dataSource);
	}, []);

	const onSearch = e => {
		// console.log(e.target.value)
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.programme_name.toLowerCase().search(value) !== -1);
		// let newDataSource = (newData.length === 0) ? newData : data
		// console.log(newData)
		setdataSearch(newData);
	};

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Programme name', dataIndex: 'programme_name', key: 'programme_name' },
		{ title: 'Code', dataIndex: 'programme_code', key: 'programme_code' },
		{ title: 'Year', dataIndex: 'programme_year', key: 'programme_year' },
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
							dataSource={dataSearch.length !== 0 ? dataSource : dataSearch}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
