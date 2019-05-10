import React from 'react';
import { Table } from 'antd';

export default props => {
	const columns = [
		// {
		//     children: [{
		//         title: 'Age',
		//         dataIndex: 'age',
		//         key: 'age',
		//         // width: 25,
		//         // sorter: (a, b) => a.age - b.age,
		//     },{
		//         title: 'Age',
		//         dataIndex: 'age',
		//         key: 'age',
		//         // width: 50,
		//         // sorter: (a, b) => a.age - b.age,
		//     },{
		//         title: 'Age',
		//         dataIndex: 'age',
		//         key: 'age',
		//         // width: 25,
		//         // sorter: (a, b) => a.age - b.age,
		//     },],
		// },
		// {
		// 	title: 'Other',
		// 	children: [
		// 		{
		// 			title: 'Age',
		// 			dataIndex: 'age',
		// 			key: 'age',
		// 			width: 200,
		// 			// sorter: (a, b) => a.age - b.age,
		// 		},
		// 		{
		// 			title: 'Address',
		// 			children: [
		// 				{
		// 					title: 'Street',
		// 					dataIndex: 'street',
		// 					key: 'street',
		// 					width: 200,
		// 				},
		// 				{
		// 					title: 'Block',
		// 					children: [
		// 						{
		// 							title: 'Building',
		// 							dataIndex: 'building',
		// 							key: 'building',
		// 							width: 100,
		// 						},
		// 						{
		// 							title: 'Door No.',
		// 							dataIndex: 'number',
		// 							key: 'number',
		// 							width: 100,
		// 						},
		// 					],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Company',
		// 	children: [
		// 		{
		// 			title: 'Company Address',
		// 			dataIndex: 'companyAddress',
		// 			key: 'companyAddress',
		// 		},
		// 		{
		// 			title: 'Company Name',
		// 			dataIndex: 'companyName',
		// 			key: 'companyName',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Action',
		// 	dataIndex: 'gender',
		// 	key: 'gender',
		// 	width: 80,
		// 	fixed: 'right',
		// },
		{ title: 'code', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
		{ title: 'title', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
		{ title: 'programme', dataIndex: 'name', key: 'name', width: 100, fixed: 'left' },
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		{
			title: 'Center',
			children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		},
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
		// {
		// 	title: 'Center',
		// 	children: [{ title: 'Age', dataIndex: 'age', key: 'age' }, { title: 'Age', dataIndex: 'age', key: 'age' }],
		// },
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
