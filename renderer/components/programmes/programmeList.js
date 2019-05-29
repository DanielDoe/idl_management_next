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
	const [searchValue, setsearchValue] = useState('')
	const [initialsource, setinitialsource] = useState(props.programmes)
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);

	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
		console.log(dataSource);
		console.log(initialsource);
	}, [height, width, initialsource]);

	const onSearch = e => {
		// console.log(e.target.value)
		setsearchValue(e.target.value.toLowerCase());

		const newData = dataSource.filter(s => s.programme_name.toLowerCase().search(searchValue) !== -1);
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
							loading={dataSource.length !== 0 ? false : true}
							pagination={{ pageSize: height / 100 }}
							dataSource={dataSource}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
