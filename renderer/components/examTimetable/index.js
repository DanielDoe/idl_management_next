import React, { useState, useEffect } from 'react';
// import ExamTable from "./examTable";
import {
	routeCenters,
	getData,
	routeAllocations,
	routeProgrammeCenters,
	routeVenues,
	routeCourses,
	routeTeachingTimeTable,
} from '../_shared/axiosCalls';
import ExamContext from './exams-context';
import { AddExam } from './newDataFields';
import TimetableList from './timetables';
import UserTimeTable from './time-table';
import { Row, Col } from 'antd';
import ExamTable from './courseSelections';
// import AdminSelection from "./adminSelections";
import './exam.css';

export default () => {
	const [programmes, setprogrammes] = useState([]);
	const [dataSource, setdataSource] = useState([
		{
			end: 'Sun Jun 16 2019 18:20:13',
			semester: '1',
			start: 'Sat Jun 15 2019 18:20:09',
			type: 'End of Semester',
		},
	]);
	const [courses, setCourses] = useState([]);
	const [fieldData, setfieldData] = useState([]);
	const [activeSelection, setactiveSelection] = useState('timetable');
	const user = JSON.parse(localStorage.getItem('login'));
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};

	const addExamElements = exam => {
		// setfieldData(exam)
		console.log(exam);
		const { start, end, semester, type } = exam;
		setdataSource([...dataSource, { ...exam }]);
		// console.log("datasource: ", data);
	};

	const removeExamElements = exam => {
		console.log('exam', exam);
	};

	const updateExamElements = exam => {
		console.log('exam', exam);
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const onButtonPressed = (selection, details) => {
		// const { name } = e.target;
		setactiveSelection(selection);
		console.log(details);
		setfieldData(details);
	};

	useEffect(() => {
		// getData({ url: routeCenters, headers }).then(data => {
		//   data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
		//   //   console.log(data);
		// });

		getData({ url: routeProgrammeCenters, headers }).then(data => {
			data.programmeCenterAllocations !== undefined
				? setprogrammes(data.programmeCenterAllocations)
				: setprogrammes([]);
		});

		// getData({ url: routeVenues, headers }).then(data => {
		//   data.venues !== undefined ? setvenues(data.venues) : setvenues([]);
		//   //   console.log(data);
		// });

		//   getData({ url: routeTeachingTimeTable, headers }).then(data => {
		//     data.timetables !== undefined ? setdataSource(data.timetables) : setdataSource([]);
		//       console.log(data);
		//   });

		getData({ url: routeCourses, headers }).then(data => {
			data.courses !== undefined ? setCourses(data.courses) : setCourses([]);
			console.log(data.courses);
		});

		return () => {
			console.log('Unmounted component');
		};
	}, []);

	const renderContent = () => {
		if (user.auth_status === 'admin') {
			switch (activeSelection) {
				case 'timetable':
					return (
						<Row style={{ height: '100%' }}>
							<Col span={16} style={{ height: '100%' }}>
								<TimetableList
									//   venues={venues}
									//   centers={centers}
									user={user}
									programmes={programmes}
									dataSource={dataSource}
									user={user}
									onItemRemove={removeExamElements}
									onButtonPressed={onButtonPressed}
									//   onValueEditted={onValueEditted}
								/>
							</Col>
							<Col
								span={8}
								style={{
									height: '100%',
									borderLeft: '1px solid rgba(0,0,0,0.12)',
								}}
							>
								<AddExam
									user={user}
									fieldData={fieldData}
									programmes={programmes}
									//   onCancel={triggerEditmode}
									//   onValueEditted={onValueEditted}
								/>
							</Col>
						</Row>
					);
				case 'timetable-content':
					return (
						<ExamTable
							fieldData={fieldData}
							courses={courses}
							user={user}
							onButtonPressed={onButtonPressed}
							programmes={programmes}
						/>
					);
				case 'timetable-content-edit':
					return (
						<UserTimeTable
							fieldData={fieldData}
							courses={courses}
							user={user}
							onButtonPressed={onButtonPressed}
							programmes={programmes}
						/>
					);
				default:
					break;
			}
		} else {
			return <div>Coordinator</div>;
		}
	};

	return (
		<ExamContext.Provider
			value={{
				// venues: venues,
				user: user,
				// centers: centers,
				programmes: programmes,
				dataSource: dataSource,
				addExamElements: addExamElements,
				removeExamElements: removeExamElements,
				updateExamElements: updateExamElements,
			}}
		>
			<div id="exams" className="exams-container">
				<div style={{ paddingTop: '1rem', height: '100%' }}>{renderContent()}</div>
			</div>
		</ExamContext.Provider>
	);
};
