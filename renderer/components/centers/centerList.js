import React, { useContext, useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import CenterContext from './center-context';

const Search = Input.Search;

export default props => {
	const context = useContext(CenterContext);
	const dataSource = props.centers.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);

	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
	}, [height, width]);

	const onSearch = e => {
		const value = e.target.value.toLowerCase();
		const newData = props.dataSource.filter(s => s.session_counr.search(value) !== -1);
	};

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Center', dataIndex: 'center_name', key: 'center_name' },
		{ title: 'Code', dataIndex: 'center_code', key: 'center_code' },
		{ title: 'Blocks', dataIndex: 'center_block', key: 'center_block' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onCenterEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeCenterElements(record)}>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<div className="center-list column">
			<div className="list-container">
				<h2>List of Centers</h2>
				<div className="table-container">
					<Table
						className="center-list-table"
						// bordered
						// loading={dataSource.length !== 0 ? false : true}
						pagination={{ pageSize: height / 100 }}
						// loading={(dataSource.length !== 0) ? false : true}
						dataSource={dataSource}
						columns={columns}
					/>
				</div>
			</div>
		</div>
	);
};
