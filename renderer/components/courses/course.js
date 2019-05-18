import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CourseContext from './course-context';
import { AddCourse } from './newCourse';
import XLSX from 'xlsx';
import CourseList from './courseList';
import './course.css';

export default () => {
	const Dialog = require('electron').remote.dialog;
	const [courses, setCourses] = useState([]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const titleCase = str => {
		return str
			.toLowerCase()
			.split(' ')
			.map(function(word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(' ');
	};

	const addCourseElements = course => {
		// add new course
		let newstate = {
			course_code: course.course_code.toUpperCase(),
			course_name: titleCase(course.course_name),
			course_semester: course.course_semester,
		};
		setCourses([...courses, newstate]);
	};

	const removeCourseElements = course => {
		const newState = courses.filter(
			element => element.course_code !== course.course_code
		);
		setCourses(newState);
	};

	const updateCourseElements = course => {
		const newstate = courses.map(element =>
			element.course_code === course.course_code ? course : element
		);

		setCourses(newstate);
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		console.log('State updated!: ');
	}, [courses]);

	const openFileDialog = semester => {
		console.log(semester);
		const o = Dialog.showOpenDialog({ properties: ['openFile'] });
		const workbook = XLSX.readFile(o[0]);

		const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

		const newData = data
			.filter((array, i) => array.length > 0 && i > 0)
			.map(element => {
				const newname = element[1];
				// console.log(element);
				addCourseElements({
					course_code: element[0],
					course_name: element[1],
				});
			});
	};

	return (
		<CourseContext.Provider
			value={{
				courses: courses,
				addCourseElements: addCourseElements,
				removeCourseElements: removeCourseElements,
				updateCourseElements: updateCourseElements,
			}}
		>
			<div style={{ width: '100%' }} id="course">
				<div style={{ height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<CourseList courses={courses} onValueEditted={onValueEditted} />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddCourse
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onListUpload={openFileDialog}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</CourseContext.Provider>
	);
};
