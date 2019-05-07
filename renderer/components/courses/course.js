import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CourseContext from './course-context';
import { AddCourse } from './newCourse';
import XLSX from 'xlsx';
import CourseList from './courseList';
import './course.css';

export default () => {
	const Dialog = require('electron').remote.dialog;
	const [courses, setCourses] = useState([
		{
			title: 'Accra',
			code: 'ACC',
			semester: 'One',
			year: 1,
		},
		{
			title: 'Accra',
			code: 'ACC',
			semester: 'One',
			year: 1,
		},
		{
			title: 'Accra',
			code: 'ACC',
			semester: 'One',
			year: 1,
		},
  ]);
  const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);

	const addCourseElements = course => {
		console.log('Adding courses', course);
	};

	const removeCourseElements = course => {
		console.log('Removing courses', course);
	};

	const updateCourseElements = course => {
		console.log('Updating courses', course);
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
				code: element[0],
				name: element[1]
			})
          });
      }

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
