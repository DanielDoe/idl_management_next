import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col } from 'antd';
import CourseContext from './course-context';

const Search = Input.Search;

export default props => {
	const dataSource = props.courses.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

	const context = useContext(CourseContext);
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);

	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
	}, [height, width]);

	useEffect(() => {
		const dataSource = props.courses.map((elem, id) => {
			return {
				...elem,
				key: id,
				sn: id + 1,
			};
		});
		setdataSearch(dataSource);
	}, [props.courses]);

	const onSearch = e => {
		// console.log(e.target.value)
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.course_title.toLowerCase().search(value) !== -1);
		// let newDataSource = (newData.length === 0) ? newData : data
		setdataSearch(newData);
	};

	// const dataSource = props.courses.map((elem, id) => {
	// 	return {
	// 		...elem,
	// 		key: id,
	// 		sn: id + 1,
	// 	};
	// });

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
		{ title: 'Course Title', dataIndex: 'course_title', key: 'course_title' },
		{ title: 'Course Code', dataIndex: 'course_code', key: 'course_code' },
		{ title: 'Semester', dataIndex: 'semester', key: 'semester' },
		{ title: 'Year', dataIndex: 'year', key: 'year' },
		// { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onValueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeCourseElements(record)}>
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
			<div className="course-list column">
				<div className="list-container">
					<h2>List of Courses</h2>
					<div className="table-container">
						<Table
							pagination={{ pageSize: height / 100 }}
							className="course-list-table"
							dataSource={dataSearch}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
