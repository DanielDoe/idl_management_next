import React from 'react';
import { Table } from 'antd';

export default props => {
	const columns = [
		{ title: 'code', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
		{ title: 'title', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
		{ title: 'programme', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		}
	];

	const data = [];
	for (let i = 0; i < 100; i++) {
		data.push({
			key: i,
			name: 'John Brown',
			age: i + 1,
			street: 'Lake Park',
			building: 'C',
			number: 2035,
			companyAddress: 'Lake Street 42',
			companyName: 'SoftLake Co',
			gender: 'M',
		});
	}
	return (
		<div className="script-list column">
			<div className="list-container">
				<h2>List of Programmes</h2>
				<div className="table-container">
					{<Table
						className="script-list-table"
						columns={columns}
						dataSource={data}
						bordered
						size="middle"
						scroll={{ x: '130%', y: 240 }}
					/>}

				</div>
			</div>
		</div>
	);
};
