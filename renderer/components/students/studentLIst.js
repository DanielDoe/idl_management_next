import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col } from 'antd';
import StudentContext from './student-context';

const Search = Input.Search;

export default props => {
	const dataSource = props.students.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const context = useContext(StudentContext);
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);

	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
	}, [height, width]);

	useEffect(() => {
		const dataSource = props.students.map((elem, id) => {
			return {
				...elem,
				key: id,
				sn: id + 1,
			};
		});
		setdataSearch(dataSource);
	}, [props.students]);

	const onSearch = e => {
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.student_title.toLowerCase().search(value) !== -1);
		setdataSearch(newData);
	};

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
        { title: 'Name', dataIndex: 'student_name', key: 'student_name' },
        { title: 'Reference no.', dataIndex: 'ref_number', key: 'ref_number' },
		{ title: 'Index no.', dataIndex: 'index_number', key: 'index_number' },
		
		// { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onValueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeStudentElements(record)}>
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
							onSearch={value => console.log(value)}
							style={{ width: '90%' }}
						/>
					</Col>
				</Row>
			</div>
			<div className="student-list column">
				<div className="list-container">
					<h2>List of students</h2>
					<div className="table-container">
						<Table
							pagination={{ pageSize: height / 100 }}
							// loading={dataSource.length !== 0 ? false : true}
							className="student-list-table"
							dataSource={dataSearch}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
